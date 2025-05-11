from fastapi import FastAPI, HTTPException
from schemas import VacancyCreate
from models import Base, User, Vacancy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

engine = create_engine(os.getenv("DATABASE_URL"))
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Hello!"}
