from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    university: Optional[str] = "Indian Institute of Technology"
    graduation_year: Optional[str] = "2026"
    degree: Optional[str] = "B.Tech in Computer Science"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    avatar_url: str
    role: str

    class Config:
        from_attributes = True

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ForgotPasswordResponse(BaseModel):
    message: str
    email: str
    reset_code: Optional[str] = None
    expires_in_minutes: int = 15

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    reset_code: str
    new_password: str

class ResetPasswordResponse(BaseModel):
    message: str
    success: bool

