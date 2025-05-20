from pydantic import BaseModel

class VacancyCreate(BaseModel):
    title: str
    description: str
    department: str

class ApplicationCreate(BaseModel):
    student_id: int
    vacancy_id: int
    cover_letter: str




