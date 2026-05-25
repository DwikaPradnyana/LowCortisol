# LowCortisol — ML-Integrated Workplace Wellness Platform

LowCortisol adalah platform berbasis **MERN Stack + FastAPI Machine Learning Service** yang dirancang untuk mengumpulkan sinyal perilaku dan psikologis harian pengguna sebagai fondasi *behavioral burnout analytics* berbasis Artificial Intelligence.

Platform ini telah berevolusi dari simulasi burnout sederhana menjadi arsitektur **End-to-End Fullstack + ML Integration Pipeline**.

---

# Core System Architecture

LowCortisol terdiri dari 3 service utama yang berjalan secara paralel:

| Layer       | Technology                          | Responsibility                |
| ----------- | ----------------------------------- | ----------------------------- |
| Frontend    | React + Vite + Tailwind CSS         | User Interface & Interaction  |
| Backend API | Node.js + Express.js + MongoDB      | Authentication, API, Database |
| ML Service  | FastAPI + TensorFlow + Scikit-Learn | Burnout Prediction Engine     |

---

# Repository Structure

```bash
lowcortisol-monorepo/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   │
│   └── package.json
│
├── ml-service/
│   ├── app/
│   │   ├── models/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── .env
│   └── venv/
│
└── README.md
```

---

# Current System Capabilities

## Completed Features

* JWT Authentication
* Protected Routes
* MongoDB Atlas Integration
* User Onboarding System
* Daily Behavioral Check-In
* Reactive Dashboard
* ML Inference Integration
* FastAPI Prediction Service
* TensorFlow Burnout Classification
* Axios Authorization Interceptor
* Insight Recommendation Engine
* ML-Ready Dataset Pipeline

---

# System Requirements

## Required Software

| Software              | Recommended Version |
| --------------------- | ------------------- |
| Node.js               | v22.x LTS           |
| Python                | 3.11+               |
| Git                   | Latest              |
| MongoDB Atlas Account | Required            |

---

# Important System Architecture

Untuk menjalankan website secara penuh, **SELURUH SERVICE WAJIB AKTIF SECARA BERSAMAAN**.

| Service    | Port   |
| ---------- | ------ |
| Frontend   | `5173` |
| Backend    | `5000` |
| ML Service | `8000` |

Jika salah satu service mati:

* frontend tidak dapat request data,
* backend gagal inference,
* model ML tidak dapat melakukan prediksi.

---

# Full Local Development Setup

## 1. Clone Repository

```bash
git clone <repository-url>
cd lowcortisol-monorepo
```

---

# 2. Backend Setup (Node.js API)

## Masuk ke folder backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Buat file `.env`

Lokasi:

```bash
backend/.env
```

Isi:

```env
MONGO_URI=mongodb://lowcortisol_admin:cortisol2026@ac-aoljfse-shard-00-00.d54vbgb.mongodb.net:27017,ac-aoljfse-shard-00-01.d54vbgb.mongodb.net:27017,ac-aoljfse-shard-00-02.d54vbgb.mongodb.net:27017/lowcortisol_db?ssl=true&replicaSet=atlas-bvbye2-shard-0&authSource=admin&appName=LowCortisol

PORT=5000

JWT_SECRET='efc005e0dfd697b0b29f2c8de2824c6bdeee4dfd6d4c3ea34810ef0a537e68d87944ac8179cb78ef4b4e1f965de1c7fdd515c7b0257dafef0c7d59f4835292f4'
```

## Jalankan backend

```bash
npm run dev
```

Expected output:

```bash
[SERVER] Aktif di http://localhost:5000
[DATABASE] MongoDB Terkoneksi
```

---

# 3. Frontend Setup (React)

## Buka terminal baru

Masuk ke folder frontend:

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Jalankan frontend

```bash
npm run dev
```

Frontend akan berjalan di:

```bash
http://localhost:5173
```

---

# 4. ML Service Setup (FastAPI + TensorFlow)

## Buka terminal ketiga

Masuk ke folder ML Service:

```bash
cd ml-service
```

---

## Python Virtual Environment Setup

### Buat virtual environment

```bash
python -m venv venv
```

### Aktifkan virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

## Buat file `.env`

Lokasi:

```bash
ml-service/.env
```

Isi:

```env
MONGO_URI=mongodb://lowcortisol_admin:cortisol2026@ac-aoljfse-shard-00-00.d54vbgb.mongodb.net:27017,ac-aoljfse-shard-00-01.d54vbgb.mongodb.net:27017,ac-aoljfse-shard-00-02.d54vbgb.mongodb.net:27017/lowcortisol_db?ssl=true&replicaSet=atlas-bvbye2-shard-0&authSource=admin&appName=LowCortisol

PORT=8000
```

---

## Jalankan ML Service

```bash
uvicorn app.main:app --reload
```

Expected output:

```bash
Uvicorn running on http://127.0.0.1:8000
Application startup complete.
```

---

# Important Execution Flow

Website hanya berjalan penuh jika:

* ✅ Frontend aktif
* ✅ Backend aktif
* ✅ ML Service aktif

Artinya harus ada:

1. Terminal Frontend
2. Terminal Backend
3. Terminal ML Service

secara bersamaan.

---

# Full Runtime Architecture

```text
React Frontend
↓
Node.js Backend API
↓
FastAPI ML Service
↓
TensorFlow Model
↓
Prediction Response
↓
MongoDB Storage
↓
Dashboard Rendering
```

---

# Authentication Flow

## Register

```http
POST /api/auth/register
```

Flow:

* User dibuat di MongoDB
* JWT dibuat
* Session disimpan ke localStorage
* User diarahkan ke onboarding

---

## Login

```http
POST /api/auth/login
```

Flow:

* JWT diverifikasi
* Axios interceptor menyisipkan bearer token otomatis
* Protected routes diaktifkan
* Dashboard sinkronisasi otomatis

---

# User Onboarding Architecture

Sistem onboarding mengumpulkan:

* data demografi,
* profil pekerjaan,
* behavioral baseline.

Semua field onboarding disimpan langsung pada model:

```bash
backend/src/models/User.js
```

---

# Daily Check-In Architecture

Check-in harian mengumpulkan:

* workload signal,
* stress signal,
* recovery signal,
* behavioral fatigue signal.

Data dikirim dari:

```text
Frontend → Backend → ML Service → TensorFlow Model
```

---

# ML Integration Pipeline

## Backend ML Adapter

Lokasi:

```bash
backend/src/services/mlService.js
```

Tugas:

* membentuk payload,
* validasi field,
* fallback handling,
* request ke FastAPI.

---

## FastAPI Prediction Endpoint

Endpoint:

```http
POST /predict
```

FastAPI menerima:

* 27 fitur perilaku,
* preprocessing,
* encoding,
* scaling,
* inference TensorFlow.

---

## ML Output Example

```json
{
  "status": "success",
  "results": {
    "prediksi_level": "Medium",
    "kepastian_ai": "56.79%"
  }
}
```

---

# Database Architecture

MongoDB menggunakan database utama:

```bash
lowcortisol_db
```

---

# Main Collections

| Collection | Purpose                     |
| ---------- | --------------------------- |
| users      | Authentication + onboarding |
| checkins   | Daily behavioral signals    |

---

# Mongoose Contract Lock

Field database wajib identik dengan field FastAPI.

Contoh:

```text
jam_kerja_per_hari
tingkat_stres
beban_kerja_persepsi
```

Tidak boleh diubah menjadi:

```text
workHours
stressLevel
workload
```

Karena akan merusak:

* OneHotEncoder
* preprocessing pipeline
* ML inference contract

---

# API Endpoints

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | `/api/auth/register`     | Register              |
| POST   | `/api/auth/login`        | Login                 |
| PUT    | `/api/users/onboarding`  | Submit onboarding     |
| GET    | `/api/users/profile`     | User profile          |
| GET    | `/api/dashboard`         | Dashboard aggregation |
| POST   | `/api/dashboard/checkin` | Submit check-in       |

---

# Security Notes

File berikut TIDAK boleh diupload:

```text
.env
venv/
node_modules/
```

Gunakan `.gitignore`.

---

# Current Development Status

## Completed

* MERN Architecture
* JWT Authentication
* MongoDB Atlas Integration
* FastAPI ML Integration
* TensorFlow Burnout Prediction
* Daily Check-In Pipeline
* Reactive Dashboard
* Insight Recommendation Engine
* ML Contract Synchronization

---

## In Progress

* Historical Analytics
* Trend Visualization
* Recommendation Personalization
* Time-Series Burnout Analysis
* Deployment Infrastructure
* Dockerization
* CI/CD Pipeline

---

# Engineering Direction

LowCortisol tidak hanya berfokus pada visual dashboard.

Platform ini dirancang untuk:

* behavioral signal integrity,
* machine-learning-ready datasets,
* scalable wellness analytics,
* burnout prediction infrastructure.

Tujuan jangka panjang:

* burnout prediction,
* proactive mental wellness monitoring,
* behavioral recommendation system,
* workplace psychological analytics.

---

# Development Notes

Jika terjadi error inference:

Pastikan:

* ✅ Backend aktif
* ✅ ML Service aktif
* ✅ Port 8000 berjalan
* ✅ Model TensorFlow berhasil dimuat
* ✅ `.env` sudah benar

---

# Team Development Reminder

Sebelum menjalankan project:

WAJIB aktifkan:

1. Frontend Terminal
2. Backend Terminal
3. ML Service Terminal

Jika salah satu mati:

sistem tidak berjalan penuh.
