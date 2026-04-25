from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI(title="LowCortisol AI Mock API")

# Mendefinisikan struktur data input
class BurnoutInput(BaseModel):
    age: int
    gender: str
    job_role: str
    experience_years: float
    company_size: str
    work_mode: str
    work_hours_per_week: float
    overtime_hours: float
    meetings_per_day: int
    deadlines_missed: int
    job_satisfaction: float
    manager_support: float
    work_life_balance: float
    sleep_hours: float
    physical_activity_days: int
    screen_time_hours: float
    caffeine_intake: float
    social_support_score: float
    has_therapy: int
    stress_level: float
    anxiety_score: float
    depression_score: float
    seeks_professional_help: int

@app.post("/predict")
async def predict(data: BurnoutInput):
    # Logika Dummy: Memberikan skor acak untuk sementara
    mock_score = round(random.uniform(0, 1), 4)
    
    if mock_score < 0.4:
        level = "Low"
    elif mock_score < 0.7:
        level = "Moderate"
    else:
        level = "High"

    return {
        "status": "success",
        "prediction": {
            "burnout_score": mock_score,
            "burnout_level": level
        },
        "message": "Ini adalah hasil dari Mock API (Model asli sedang dilatih)."
    }