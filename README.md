# LowCortisol — Full-Stack MERN Application

Repositori ini telah direstrukturisasi menjadi arsitektur **MERN Stack (MongoDB, Express, React, Node.js)** yang terintegrasi secara penuh (*End-to-End*).

Fitur berikut telah aktif:
- JWT Authentication
- Protected API Routes
- MongoDB Atlas Integration
- Daily Check-In System
- Reactive Dashboard Synchronization
- Mock AI Burnout Inference

Folder `FE` lama telah dihapus untuk menghindari redundansi arsitektur. Seluruh pengembangan sekarang diisolasi ke dalam dua domain utama:

- `/backend` → Express.js, MongoDB, JWT, Mongoose, AI Inference
- `/frontend` → React.js (Vite), Tailwind CSS, Axios Interceptor

---

## System Requirements

Pastikan environment lokal telah memiliki:

- **Node.js v22.x LTS** *(v24 tidak direkomendasikan karena konflik DNS resolver MongoDB Atlas)*
- NPM
- Git
- MongoDB Atlas Account
- Postman / Thunder Client *(opsional untuk API testing)*

---

## Project Structure

```bash
lowcortisol-monorepo/
│
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Local Setup & Live Demo

> Jalankan **dua terminal terpisah**. Backend dan Frontend wajib aktif bersamaan.

### 1. Backend Setup

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
MONGO_URI=mongodb://your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000
```

Jalankan server:

```bash
npm run dev
```

Expected output:

```bash
[SERVER] Aktif di http://localhost:5000
[DATABASE] MongoDB Terkoneksi
```

---

### 2. Frontend Setup

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

## Authentication Flow

### Register

```http
POST /api/auth/register
```

- User tersimpan ke MongoDB Atlas
- JWT token dibuat
- Session tersimpan di localStorage

---

### Login

```http
POST /api/auth/login
```

- JWT diverifikasi
- Axios Interceptor otomatis menyisipkan Bearer Token
- User diarahkan ke Dashboard

---

## Dashboard Flow

Dashboard menggunakan:
- Protected API Request
- Axios Authorization Interceptor
- Dynamic User Profile Fetching
- Reactive Burnout Status

Endpoint utama:

```http
GET /api/users/profile
GET /api/dashboard
POST /api/dashboard/checkin
```

---

## Daily Check-In Flow

1. Login
2. Klik `Log Daily Routine`
3. Isi:
   - Work Hours
   - Sleep Duration
   - Cognitive Load
4. Submit Check-In

Server akan:
- Memproses data
- Menjalankan Mock AI Inference
- Mengupdate MongoDB
- Mengirim status burnout terbaru ke Dashboard

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login & JWT generation |
| GET | `/api/users/profile` | Protected user profile |
| GET | `/api/dashboard` | Dashboard aggregation |
| POST | `/api/dashboard/checkin` | Submit daily routine |

---

## ML / AI Integration

Seluruh logika inferensi AI berada di:

```bash
backend/src/controllers/dashboardController.js
```

Tim ML dapat langsung mengganti:
- Mock inference
- Risk scoring
- TensorFlow model integration
- Recommendation engine

tanpa mengubah arsitektur Front-End.

---

## Security Notes

Jangan pernah upload:
- `.env`
- JWT Secret
- MongoDB Credentials
- API Keys

File sensitif telah diproteksi menggunakan `.gitignore`.

---

## Current MVP Status

### Completed
- MERN Architecture
- JWT Authentication
- MongoDB Atlas
- Protected Routes
- Axios Interceptor
- Daily Check-In
- Reactive Dashboard

### In Progress
- Real ML Model Integration
- Historical Analytics
- Burnout Visualization
- Deployment Pipeline
