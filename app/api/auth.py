from fastapi import APIRouter, Depends, status
from app.core.database import database
from app.core.rate_limit import create_rate_limiter
from app.schemas.user import (
    UserRegisterRequest,
    UserLoginRequest,
    AuthResponse,
    UserProfileResponse,
)
from app.services.auth_service import (
    register_user,
    authenticate_user,
    get_current_user,
)

login_rate_limiter = create_rate_limiter(
    scope="login",
    max_requests=5,
    window_seconds=60,
    detail="Too many login attempts, please try again later.",
)

signup_rate_limiter = create_rate_limiter(
    scope="signup",
    max_requests=5,
    window_seconds=60,
    detail="Too many signup attempts, please try again later.",
)

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
    dependencies=[Depends(signup_rate_limiter)],
)
async def register(register_data: UserRegisterRequest):
    result = await register_user(database, register_data)
    return {
        "message": "User registered successfully",
        "data": result,
    }


@router.post(
    "/signup",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    include_in_schema=False,
    dependencies=[Depends(signup_rate_limiter)],
)
async def signup(register_data: UserRegisterRequest):
    """Alias for /register"""
    result = await register_user(database, register_data)
    return {
        "message": "User registered successfully",
        "data": result,
    }


@router.post(
    "/login",
    response_model=AuthResponse,
    summary="Log in with email or username and password",
    dependencies=[Depends(login_rate_limiter)],
)
async def login(login_data: UserLoginRequest):
    result = await authenticate_user(database, login_data)
    return {
        "message": "Login successful",
        "data": result,
    }


@router.get(
    "/me",
    response_model=UserProfileResponse,
    summary="Get current authenticated user profile",
)
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "message": "Profile retrieved successfully",
        "data": current_user,
    }
