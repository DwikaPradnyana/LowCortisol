# LowCortisol — ML-Ready Workplace Wellness Platform

LowCortisol adalah platform berbasis **MERN Stack** yang dirancang untuk mengumpulkan sinyal perilaku dan psikologis harian pengguna sebagai fondasi *ground-truth dataset* untuk analisis risiko burnout berbasis Machine Learning di masa depan.

Repositori ini telah direstrukturisasi menjadi arsitektur **End-to-End Fullstack** dengan pemisahan domain yang jelas antara:

* Frontend Experience Layer
* Backend API Layer
* ML-Ready Data Pipeline

---

# Core Architecture

## Technology Stack

| Layer               | Technology                                       |
| ------------------- | ------------------------------------------------ |
| Frontend            | React.js + Vite + Tailwind CSS                   |
| Backend             | Node.js + Express.js                             |
| Database            | MongoDB Atlas                                    |
| Authentication      | JWT                                              |
| State Communication | Axios Interceptor                                |
| ORM                 | Mongoose                                         |
| AI Layer            | Rule-Based Burnout Risk Simulation *(temporary)* |

---

# Repository Structure

```bash
lowcortisol-monorepo/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
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
├── ml-tools/
│
└── README.md
```

---

# System Capabilities

## Completed Features

* JWT Authentication
* Protected API Routes
* MongoDB Atlas Integration
* Daily Behavioral Check-In
* Reactive Dashboard Synchronization
* User Onboarding Guard
* Nullable Hybrid Input Architecture
* ML-Ready Data Collection Pipeline
* Axios Authorization Interceptor
* Burnout Risk Simulation

---

# System Requirements

Recommended environment:

* Node.js v22.x LTS
* NPM
* Git
* MongoDB Atlas Account

Optional:

* Postman
* Thunder Client

---

# Local Development Setup

> Backend dan Frontend wajib dijalankan secara paralel menggunakan dua terminal berbeda.

---

# 1. Backend Setup

Masuk ke folder backend:

```bash
cd backend
npm install
```

Buat file:

```bash
backend/.env
```

Isi:

```env
MONGO_URI=mongodb://lowcortisol_admin:cortisol2026@ac-aoljfse-shard-00-00.d54vbgb.mongodb.net:27017,ac-aoljfse-shard-00-01.d54vbgb.mongodb.net:27017,ac-aoljfse-shard-00-02.d54vbgb.mongodb.net:27017/lowcortisol_db?ssl=true&replicaSet=atlas-bvbye2-shard-0&authSource=admin&appName=LowCortisol

JWT_SECRET='efc005e0dfd697b0b29f2c8de2824c6bdeee4dfd6d4c3ea34810ef0a537e68d87944ac8179cb78ef4b4e1f965de1c7fdd515c7b0257dafef0c7d59f4835292f4'

PORT=5000
```

Jalankan backend server:

```bash
npm run dev
```

Expected output:

```bash
[SERVER] Running at http://localhost:5000
[DATABASE] MongoDB Connected
```

---

# 2. Frontend Setup

Buka terminal baru:

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di:

```bash
http://localhost:5173
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
* Dashboard melakukan sinkronisasi data real-time

---

# User Onboarding Architecture

Sistem onboarding digunakan untuk mengumpulkan:

* data demografi,
* profil pekerjaan,
* baseline behavioral signal.

Field onboarding disimpan secara permanen pada model `User`.

User yang belum onboarding akan:

* diblokir dari dashboard,
* dipaksa menyelesaikan onboarding terlebih dahulu.

Flow ini dikontrol melalui:

```bash
frontend/src/components/layout/ProtectedRoute.jsx
```

dan:

```bash
backend/src/models/User.js
```

---

# Daily Check-In Architecture

Sistem check-in harian menggunakan pendekatan:

## Hybrid Validation Architecture

### Mandatory Core Variables

5 variabel inti wajib diisi:

* Work Duration
* Sleep Duration
* Workload Perception
* Stress Level
* Productivity Perception

Variabel ini divalidasi secara ketat pada:

* Frontend
* Backend
* Database Schema

---

### Optional Enrichment Variables

8 variabel tambahan bersifat nullable:

* Overtime Duration
* Screen Time
* Meeting Frequency
* Sleep Quality
* Physical Complaints
* Work Satisfaction
* Work-Life Balance
* Team Support

Nullable strategy digunakan untuk:

* menjaga explicit user intent,
* menghindari synthetic imputation,
* mempertahankan integritas dataset,
* mempersiapkan pipeline supervised learning.

---

# UX Engineering Highlights

## Single-Scroll Progressive Form

Form multi-step dihapus untuk mengurangi:

* interaction fatigue,
* abandonment rate,
* excessive navigation friction.

---

## Nullable Slider Strategy

HTML range input standar tidak mendukung state `null`.

Solusi yang diterapkan:

* visual untouched state,
* dashed container strategy,
* explicit interaction detection,
* reactive styling.

Tujuan:

* membedakan data kosong vs data valid,
* menjaga kualitas ground-truth signal.

---

## Progressive Disclosure

Field enrichment disembunyikan secara default dan hanya muncul ketika user membuka panel tambahan.

Pendekatan ini digunakan untuk:

* meningkatkan completion rate,
* mengurangi cognitive overload,
* menjaga fokus pada core signal collection.

---

# Dashboard System

Dashboard bersifat reactive dan tersinkronisasi langsung dengan database.

Endpoint utama:

```http
GET /api/dashboard
```

Dashboard menampilkan:

* burnout status,
* latest check-in,
* behavioral summary,
* dynamic user profile.

---

# API Endpoints

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| POST   | `/api/auth/register`     | Register new user      |
| POST   | `/api/auth/login`        | Login & JWT generation |
| GET    | `/api/users/profile`     | Protected profile data |
| PUT    | `/api/users/onboarding`  | Submit onboarding data |
| GET    | `/api/dashboard`         | Dashboard aggregation  |
| POST   | `/api/dashboard/checkin` | Submit daily check-in  |

---

# Backend Inference Layer

Seluruh simulasi burnout inference saat ini berada di:

```bash
backend/src/controllers/dashboardController.js
```

Arsitektur telah dipersiapkan agar tim ML dapat:

* mengganti mock inference,
* menghubungkan TensorFlow/PyTorch model,
* menambahkan recommendation engine,
* membuat scoring pipeline,
* membangun prediction service

tanpa mengubah arsitektur frontend.

---

# ML Pipeline Readiness

Repositori ini belum menggunakan model ML production.

Namun arsitektur telah dipersiapkan untuk:

* supervised learning,
* behavioral analytics,
* time-series analysis,
* burnout risk prediction,
* psychological signal processing.

Fokus fase MVP saat ini adalah:

> pengumpulan dataset yang bersih dan konsisten.

---

# Security Notes

File berikut tidak boleh diunggah ke repository publik:

* `.env`
* API Keys
* MongoDB Credentials
* JWT Secret

Gunakan `.gitignore` untuk melindungi file sensitif.

---

# Current Development Status

## Completed

* MERN Monorepo Architecture
* JWT Authentication
* MongoDB Atlas Integration
* Protected Route System
* User Onboarding Flow
* Daily Check-In Pipeline
* Reactive Dashboard
* Hybrid Validation Architecture
* Nullable Input System
* Burnout Risk Simulation

---

## In Progress

* Historical Analytics
* Burnout Trend Visualization
* ML Model Integration
* Recommendation Engine
* Data Export Pipeline
* Deployment Infrastructure

---

# Engineering Direction

LowCortisol tidak hanya berfokus pada visual dashboard, tetapi pada rekayasa:

* behavioral data integrity,
* scalable wellness architecture,
* dan machine-learning-ready signal collection.

Tujuan jangka panjang sistem ini adalah membangun pipeline analitik burnout berbasis data perilaku harian yang dapat digunakan untuk:

* prediksi risiko,
* rekomendasi personal,
* dan monitoring kesejahteraan kerja secara proaktif.
