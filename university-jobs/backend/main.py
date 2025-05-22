from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
from models import Base, User, Vacancy, Application, pwd_context
from schemas import (UserCreate, UserOut, Token,
                     VacancyCreate, VacancyOut,
                     ApplicationCreate, ApplicationOut)
from auth import create_access_token, get_current_user, oauth2_scheme

load_dotenv()

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:kirill180305@localhost:5432/university_jobs")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    db_user = User(
        email=user.email,
        hashed_password=pwd_context.hash(user.password),
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/token", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not db_user.verify_password(user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token = create_access_token({"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/vacancies", response_model=VacancyOut)
def create_vacancy(
        vacancy: VacancyCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["employer", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only employers can create vacancies"
        )

    db_vacancy = Vacancy(
        **vacancy.dict(),
        employer_id=current_user.id
    )
    db.add(db_vacancy)
    db.commit()
    db.refresh(db_vacancy)
    return db_vacancy


@app.get("/vacancies", response_model=list[VacancyOut])
def get_vacancies(
        department: Optional[str] = None,
        title: Optional[str] = None,
        db: Session = Depends(get_db)
):
    query = db.query(Vacancy)
    if department:
        query = query.filter(Vacancy.department == department)
    if title:
        query = query.filter(Vacancy.title.contains(title))
    return query.all()


@app.post("/applications", response_model=ApplicationOut)
def create_application(
        application: ApplicationCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    vacancy = db.query(Vacancy).filter(Vacancy.id == application.vacancy_id).first()
    if not vacancy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vacancy not found"
        )

    db_application = Application(
        **application.dict(),
        student_id=current_user.id,
        status="pending"
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
