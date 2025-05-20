from fastapi import FastAPI, HTTPException
from fastapi.params import Depends

from schemas import VacancyCreate, ApplicationCreate
from models import User, Vacancy, Application
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import os
from dotenv import load_dotenv

Base = declarative_base()


load_dotenv()


app = FastAPI()

engine = create_engine(os.getenv("DATABASE_URL"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/vacancies/")
def create_vacancy(vacancy: VacancyCreate, db: Session = Depends(get_db)):
    db_vacancy = Vacancy(**vacancy.dict())
    db.add(db_vacancy)
    db.commit()
    return db_vacancy

@app.get("/vacancies/")
def read_vacancies(department: str = None, db: Session = Depends(get_db)):
    query = db.query(Vacancy)
    if department:
        query = query.filter(Vacancy.department == department)
    return query.all()

@app.post("/applications/")
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    db_application = Application(**application.dict())
    db.add(db_application)
    db.commit()
    return {"message": "Заявка отправлена!"}

