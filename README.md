# LowCortisol AI Integration

Branch `feat/ai-integration` berisi seluruh aset, model machine learning, dan layanan inferensi yang digunakan oleh sistem LowCortisol untuk melakukan klasifikasi tingkat risiko burnout berdasarkan data pengguna dan hasil check-in harian.

---

## Repository Structure

```text
lowcortisol-repoai
│
├── ai-services
│   ├── feature_names.pkl
│   ├── independent_test_predictions.csv
│   ├── le_target.pkl
│   ├── model_architecture.json
│   ├── model_burnout_production.keras
│   ├── model_for_newest.ipynb
│   ├── model_summary.txt
│   ├── model.ipynb
│   ├── onehot_encoder.pkl
│   ├── scaler.pkl
│   ├── X_.csv
│   └── y_.csv
│
├── hugging-face
│   ├── .gitattributes
│   ├── Dockerfile
│   ├── feature_names.pkl
│   ├── le_target.pkl
│   ├── main.py
│   ├── model_burnout_production.keras
│   ├── model_burnout_weights.weights.h5
│   ├── onehot_encoder.pkl
│   ├── README.md
│   ├── requirements.txt
│   └── scaler.pkl
│
└── README.md
```

---

## Folder Description

### ai-services/

Folder utama untuk pengembangan dan eksperimen model machine learning.

Berisi:

- Dataset hasil preprocessing
- Notebook eksperimen dan pelatihan model
- Model final dalam format Keras
- Encoder dan scaler yang digunakan saat training
- File metadata model

#### Important Files

| File | Description |
|--------|------------|
| model.ipynb | Notebook utama proses training |
| model_for_newest.ipynb | Versi eksperimen terbaru |
| model_burnout_production.keras | Model produksi final |
| scaler.pkl | StandardScaler untuk fitur numerik |
| onehot_encoder.pkl | Encoder fitur kategorikal |
| le_target.pkl | Label encoder target burnout |
| feature_names.pkl | Daftar fitur yang digunakan model |
| model_summary.txt | Ringkasan arsitektur model |

---

### hugging-face/

Folder deployment model untuk Hugging Face Space.

Berisi API inferensi yang digunakan oleh backend LowCortisol.

#### Important Files

| File | Description |
|--------|------------|
| main.py | Endpoint FastAPI inferensi |
| Dockerfile | Konfigurasi container deployment |
| requirements.txt | Dependency Python |
| model_burnout_production.keras | Model inferensi |
| model_burnout_weights.weights.h5 | Bobot model |
| scaler.pkl | Scaler produksi |
| onehot_encoder.pkl | Encoder produksi |
| le_target.pkl | Decoder label output |
| feature_names.pkl | Mapping fitur input |

---

## Machine Learning Pipeline

```text
User Input
     │
     ▼
Backend (Node.js)
     │
     ▼
Hugging Face API
     │
     ▼
Preprocessing
(Scaler + Encoder)
     │
     ▼
Burnout Prediction Model
(Keras/TensorFlow)
     │
     ▼
Prediction Result
     │
     ▼
Backend Response
```

---

## Technology Stack

### AI Development

- Python 3.11+
- TensorFlow / Keras
- Scikit-Learn
- Pandas
- NumPy
- Jupyter Notebook

### Deployment

- FastAPI
- Uvicorn
- Docker
- Hugging Face Spaces

---

## Model Output

Model mengklasifikasikan tingkat risiko burnout pengguna berdasarkan kombinasi:

### Demographic Features

- Jenis kelamin
- Usia
- Pendidikan terakhir
- Status pernikahan
- Departemen
- Lama bekerja
- Tipe perusahaan
- Status WFH

### Behavioral Features

- Jam kerja
- Jam tidur
- Tingkat stres
- Produktivitas
- Work-life balance
- Frekuensi olahraga
- Jumlah deadline
- Dukungan atasan
- Frekuensi meeting

### Health Features

- Riwayat kesehatan mental
- Keluhan fisik
- Status merokok

---

## Deployment Endpoint

Production endpoint:

```text
https://jikatakiri45-lowcortisol-api.hf.space/predict
```

Example Request:

```json
{
  "usia": 25,
  "jam_kerja_per_hari": 8,
  "jam_tidur_per_hari": 7,
  "tingkat_stres": 5,
  "produktivitas_diri": 7
}
```

---

## Branch Information

```text
Branch:
feat/ai-integration
```

Purpose:

- AI model development
- Training experiments
- Model versioning
- Hugging Face deployment
- Burnout prediction API

---

## Contributors

LowCortisol Capstone Team — AI Division