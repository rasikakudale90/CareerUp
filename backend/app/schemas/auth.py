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
