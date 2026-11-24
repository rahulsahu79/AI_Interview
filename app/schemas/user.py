import re
from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field, EmailStr, validator


# ── Shared constants (mirrored in frontend/lib/validation.ts) ────────────────
USERNAME_MIN_LENGTH = 3
USERNAME_MAX_LENGTH = 50
USERNAME_REGEX = re.compile(r"^[A-Za-z]+$")

PASSWORD_MIN_LENGTH = 8

# Stricter email regex – same pattern used on the frontend
EMAIL_REGEX = re.compile(
    r"^[A-Za-z0-9._%+\-]+@"
    r"[A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?"
    r"(\.[A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?)*"
    r"\.[A-Za-z]{2,10}$"
)


class UserRegisterRequest(BaseModel):
    username: str = Field(
        ...,
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        description="Unique username (letters only, 3-50 characters)",
    )
    email: EmailStr = Field(..., description="Valid user email address")
    password: str = Field(
        ...,
        min_length=PASSWORD_MIN_LENGTH,
        description=(
            "Password (≥8 chars, uppercase, lowercase, digit, and special character)"
        ),
    )
    full_name: Optional[str] = Field(None, description="Optional full name")

    @validator("username")
    def username_is_alpha(cls, v: str) -> str:
        """Username must contain only alphabetic characters (A-Z, a-z)."""
        if not USERNAME_REGEX.match(v):
            raise ValueError("Username must contain only letters (A-Z, a-z)")
        return v

    @validator("email")
    def email_is_strict(cls, v: str) -> str:
        """Apply our stricter regex on top of Pydantic's EmailStr."""
        if not EMAIL_REGEX.match(v):
            raise ValueError(
                "Please enter a valid email address (e.g. name@example.com)"
            )
        return v

    @validator("password")
    def password_is_strong(cls, v: str) -> str:
        """Enforce password complexity rules:
        * At least one uppercase letter
        * At least one lowercase letter
        * At least one digit
        * At least one special character
        """
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r"[^A-Za-z0-9]", v):
            raise ValueError("Password must contain at least one special character")
        return v


class UserLoginRequest(BaseModel):
    email: str = Field(..., description="Email address or username")
    password: str = Field(..., description="User password")


class UserData(BaseModel):
    id: str
    username: str
    email: str
    full_name: Optional[str] = None
    created_at: Optional[datetime] = None


class TokenData(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserData


class AuthResponse(BaseModel):
    message: str
    data: TokenData


class UserProfileResponse(BaseModel):
    message: str
    data: UserData
