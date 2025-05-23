from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import declarative_base, relationship
from passlib.context import CryptContext

Base = declarative_base()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # student, employer, admin
    vacancies = relationship("Vacancy", back_populates="employer")
    applications = relationship("Application", back_populates="student")

    def verify_password(self, plain_password: str):
        return pwd_context.verify(plain_password, self.hashed_password)


class Vacancy(Base):
    __tablename__ = "vacancies"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)
    department = Column(String)
    employer_id = Column(Integer, ForeignKey("users.id"))

    employer = relationship("User", back_populates="vacancies")
    applications = relationship("Application", back_populates="vacancy")


class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    status = Column(String(20), default="pending")
    cover_letter = Column(String(500))

    student = relationship("User", back_populates="applications")
    vacancy = relationship("Vacancy", back_populates="applications")