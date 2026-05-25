from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.preprocess import preprocess_input
from app.predictor import predict_burnout

app = FastAPI(
    title="LowCortisol Burnout Prediction API",
    description="AI Prediction Service",
    version="1.0"
)

class EmployeeInput(BaseModel):

    jenis_kelamin: str
    usia: int
    pendidikan_terakhir: str
    status_pernikahan: str
    departemen: str
    lama_bekerja_tahun: int
    tipe_perusahaan: str
    status_wfh: str

    jam_kerja_per_hari: int
    jam_lembur_per_hari: int
    jam_tidur_per_hari: int
    kualitas_tidur: int
    frekuensi_olahraga_per_minggu: int
    jam_layar_per_hari: int
    tingkat_stres: int
    kepuasan_kerja: int
    work_life_balance: int
    produktivitas_diri: int
    dukungan_atasan: int
    frekuensi_meeting_per_hari: int
    jumlah_deadline_per_minggu: int

    beban_kerja_persepsi: str
    status_merokok: str
    riwayat_kesehatan_mental: str
    keluhan_fisik_utama: str
    keamanan_pekerjaan: str
    frekuensi_konflik_kerja: int


@app.get("/")
def root():

    return {
        "status": "online",
        "message": "LowCortisol ML Service Active"
    }


@app.post("/predict")
def predict(input_data: EmployeeInput):

    try:

        processed_input = preprocess_input(
            input_data.dict()
        )

        prediction_results = predict_burnout(
            processed_input
        )

        return {
            "status": "success",
            "results": prediction_results
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )