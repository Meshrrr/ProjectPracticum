from fastapi import FastAPI, HTTPException
from schemas import VacancyCreate

app = FastAPI()

@app.get("/vacancies")