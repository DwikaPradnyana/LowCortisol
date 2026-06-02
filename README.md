# LowCortisol — ML-Integrated Workplace Wellness Platform

LowCortisol adalah platform berbasis **MERN Stack + FastAPI Machine Learning Service** yang dirancang untuk mengumpulkan sinyal perilaku dan psikologis harian pengguna sebagai fondasi *behavioral burnout analytics* berbasis Artificial Intelligence.

Platform ini telah berevolusi dari simulasi burnout sederhana menjadi arsitektur **End-to-End Fullstack + ML Integration Pipeline**.

---

# Core System Architecture

LowCortisol beroperasi pada arsitektur *Microservices* yang terdesentralisasi (Decoupled Architecture), memisahkan beban kerja antarmuka, *database*, dan pemrosesan *Machine Learning*.

| Layer       | Technology                          | Responsibility                |
| ----------- | ----------------------------------- | ----------------------------- |
| Frontend    | React + Vite + Tailwind CSS         | User Interface & Interaction  |
| Backend API | Node.js + Express.js + MongoDB      | Authentication, API, Database |

---

# Production Architecture & Live Endpoints

Sistem saat ini telah di-*deploy* secara penuh ke lingkungan produksi. Ketiga layanan ini terhubung secara otomatis di *Cloud*.

| Service | Live URL / Endpoint | Platform Hosting |
| :--- | :--- | :--- |
| **Frontend (UI)** | [https://low-cortisol-six.vercel.app/](https://low-cortisol-six.vercel.app/) | Vercel |
| **Backend API** | `https://lowcortisol-api.onrender.com/api` | Render.com |
| **AI Inference** | `https://jikatakiri45-lowcortisol-api.hf.space/predict` | Hugging Face Spaces |

**System Health Check:**
Untuk memverifikasi apakah kontainer Backend sedang aktif (bangun dari *cold start*), akses endpoint berikut:
`GET https://lowcortisol-api.onrender.com/api/health`

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
│   │   └── config/
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   │
│   ├── .env
│   └── package.json
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
* AI Inference Integration
* FastAPI Prediction Service
* TensorFlow Burnout Classification
* Axios Authorization Interceptor
* Insight Recommendation Engine
* ML-Ready Dataset Pipeline
* **Cloud Deployment & CORS Configuration**

---

# System Requirements (Local Development)

Jika Anda ingin menjalankan sistem secara lokal untuk keperluan pengembangan:

| Software              | Recommended Version |
| --------------------- | ------------------- |
| Node.js               | v22.x LTS           |
| Python                | 3.11+               |
| Git                   | Latest              |
| MongoDB Atlas Account | Required            |

---

# Local Development Setup

*Catatan: Karena ML Service telah di-deploy ke Hugging Face, pengembang lokal hanya perlu menjalankan Frontend dan Backend secara lokal.*

## 1. Clone Repository

```bash
git clone <repository-url>
cd lowcortisol-monorepo
```

---

## 2. Backend Setup (Node.js API)

Masuk ke folder backend:
```bash
cd backend
npm install
```

Buat file `.env` (Ganti value dengan kredensial Anda yang sah):
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
ML_API_URL=https://jikatakiri45-lowcortisol-api.hf.space/predict
```

Jalankan backend:
```bash
npm run dev
```

---

## 3. Frontend Setup (React)

Buka terminal baru, masuk ke folder frontend:
```bash
cd frontend
npm install
```

Buat file `.env` di folder frontend:
```env
VITE_API_URL=http://localhost:5000
VITE_N8N_WEBHOOK_URL=https://n8n-yy2qhejc326s.tomat.sumopod.my.id/webhook/lowcortisol-chat
```

Jalankan frontend:
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`.

---

# Full Runtime Architecture

```text
React Frontend (Vercel)
↓
Node.js Backend API (Render)
↓
FastAPI ML Service (Hugging Face)
↓
TensorFlow Model
↓
Prediction Response
↓
MongoDB Storage (Atlas)
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

Semua field onboarding disimpan langsung pada model: `backend/src/models/User.js`

---

# Daily Check-In Architecture

Check-in harian mengumpulkan:

* workload signal,
* stress signal,
* recovery signal,
* behavioral fatigue signal.

Data dikirim dari:
`Frontend → Backend → AI Service → TensorFlow Model`

---

# ML Integration Pipeline

## Backend ML Adapter

Lokasi: `backend/src/services/mlService.js`

Tugas:

* membentuk payload,
* validasi field,
* fallback handling,
* request eksternal ke FastAPI (Hugging Face).

---

## FastAPI Prediction Endpoint

Endpoint: `POST /predict`

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

MongoDB menggunakan database utama: `lowcortisol_db`

# Main Collections

| Collection | Purpose                     |
| ---------- | --------------------------- |
| users      | Authentication + onboarding |
| checkins   | Daily behavioral signals    |

---

# Mongoose Contract Lock

Field database wajib identik dengan field FastAPI.

Contoh:
`jam_kerja_per_hari`, `tingkat_stres`, `beban_kerja_persepsi`

Tidak boleh diubah menjadi:
`workHours`, `stressLevel`, `workload`

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

File berikut **TIDAK BOLEH** diupload ke sistem Version Control (GitHub):

```text
.env
venv/
node_modules/
```

Gunakan `.gitignore` untuk mengamankan kredensial sistem.

---

# Engineering Direction

LowCortisol tidak hanya berfokus pada visual dashboard. Platform ini dirancang untuk:

* behavioral signal integrity,
* machine-learning-ready datasets,
* scalable wellness analytics,
* burnout prediction infrastructure.

Tujuan jangka panjang:

* burnout prediction,
* proactive mental wellness monitoring,
* behavioral recommendation system,
* workplace psychological analytics.