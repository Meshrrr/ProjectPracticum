from pydantic import BaseModel, EmailStr
from typing import Optional

class VacancyCreate(BaseModel):
    title: str
    description: str
    department: str

class ApplicationCreate(BaseModel):
    student_id: int
    vacancy_id: int
    cover_letter: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str

class VacancyOut(VacancyCreate):
    id: int
    employer_id: int


class ApplicationOut(ApplicationCreate):
    id: int
    student_id: int
    status: str



