from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
import bcrypt
import jwt
from bson import ObjectId
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import settings
from app.core.database import database
from app.schemas.user import UserRegisterRequest, UserLoginRequest

security = HTTPBearer(auto_error=False)

def hash_password(password: str) -> str:
    """Hash a plain text password using bcrypt."""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against the bcrypt hash."""
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )
    except Exception:
        return False

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Generate a signed JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decode and validate a JWT access token."""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except jwt.PyJWTError:
        return None

def format_user_data(user: Dict[str, Any]) -> Dict[str, Any]:
    """Helper to convert MongoDB user document to schema dictionary."""
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "full_name": user.get("full_name"),
        "created_at": user.get("created_at")
    }

async def register_user(db, register_data: UserRegisterRequest) -> Dict[str, Any]:
    """Register a new user in MongoDB."""
    email = register_data.email.strip().lower()
    username = register_data.username.strip()

    # Check for existing email or username
    existing_user = await db.users.find_one({
        "$or": [
            {"email": email},
            {"username": {"$regex": f"^{username}$", "$options": "i"}}
        ]
    })

    if existing_user:
        if existing_user.get("email") == email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email already exists."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This username is already taken. Please choose another."
            )

    hashed_pw = hash_password(register_data.password)
    now = datetime.now(timezone.utc)

    user_doc = {
        "username": username,
        "email": email,
        "hashed_password": hashed_pw,
        "full_name": register_data.full_name,
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }

    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    # Create token
    token = create_access_token(data={"sub": str(result.inserted_id), "email": email, "username": username})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": format_user_data(user_doc)
    }

async def authenticate_user(db, login_data: UserLoginRequest) -> Dict[str, Any]:
    """Authenticate an existing user via email or username and password."""
    identifier = login_data.email.strip().lower()

    # Search by email or username
    user = await db.users.find_one({
        "$or": [
            {"email": identifier},
            {"username": {"$regex": f"^{identifier}$", "$options": "i"}}
        ]
    })

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account is currently disabled."
        )

    token = create_access_token(data={
        "sub": str(user["_id"]),
        "email": user["email"],
        "username": user["username"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": format_user_data(user)
    }

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> Dict[str, Any]:
    """Dependency to retrieve the currently authenticated user from Bearer token."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please provide a valid Bearer token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(credentials.credentials)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload["sub"]
    try:
        user = await database.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user identity format."
        )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive."
        )

    return format_user_data(user)
