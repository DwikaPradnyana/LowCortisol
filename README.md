# LowCortisol — ML-Integrated Workplace Wellness Platform

LowCortisol adalah platform berbasis **MERN Stack + FastAPI Machine Learning Service** yang dirancang untuk mengumpulkan sinyal perilaku dan psikologis harian pengguna sebagai fondasi *behavioral burnout analytics* berbasis Artificial Intelligence.

Platform ini telah berevolusi dari eksperimen data menjadi arsitektur **End-to-End Fullstack + ML Integration Pipeline** yang terdesentralisasi secara penuh di lingkungan cloud.

---

## 🏗️ Core System Architecture

LowCortisol menggunakan arsitektur *Microservices* yang memisahkan beban kerja eksplorasi data, pelatihan model, antarmuka pengguna, operasi database, dan inferensi AI secara asinkron.

Sistem ini ditopang oleh lima pilar utama:

| Modul Direktori  | Peran Bertanggung Jawab   | Deskripsi Tanggung Jawab                                                                                                    |
| ---------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `DataScientist/` | Data Scientist            | Pembersihan dataset mentah (Kaggle), Exploratory Data Analysis (EDA), dan standardisasi fitur perilaku (*Data Dictionary*). |
| `ai-services/`   | Machine Learning Engineer | Training environment, eksperimen algoritma TensorFlow, penyusunan scaler, encoder, dan pembentukan model akhir.             |
| `hugging-face/`  | Machine Learning Engineer | Lingkungan produksi FastAPI yang membungkus model terkompilasi untuk menerima request inferensi (*Prediction Endpoint*).    |
| `backend/`       | Full Stack Developer      | REST API (Node.js/Express) untuk routing, autentikasi JWT, dan orkestrasi integrasi antara MongoDB dan ML Service.          |
| `frontend/`      | Full Stack Developer      | User Interface (React/Tailwind) untuk Daily Check-In dan visualisasi dashboard analitik.                                    |

---

## 🚀 Production Architecture & Live Endpoints

Sistem telah dideploy secara penuh ke lingkungan produksi. Ketiga layanan utama saling terhubung dan dilindungi melalui kebijakan CORS.

| Service          | URL / Endpoint                                        | Hosting             |
| ---------------- | ----------------------------------------------------- | ------------------- |
| Frontend         | https://low-cortisol-six.vercel.app/                  | Vercel              |
| Backend API      | https://lowcortisol-api.onrender.com/api              | Render              |
| ML Inference API | https://jikatakiri45-lowcortisol-api.hf.space/predict | Hugging Face Spaces |

### System Health Check

Gunakan endpoint berikut untuk memeriksa status backend:

GET https://lowcortisol-api.onrender.com/api/health

---

## 📂 Monorepo Structure

```
lowcortisol-monorepo/
│
├── DataScientist/        # Dataset, EDA, Analytics
├── ai-services/          # Model Training, Scaler, Encoder
├── backend/              # Node.js REST API, Mongoose Models
├── frontend/             # React Application, UI Components
├── hugging-face/         # FastAPI Production Model
├── .gitignore            # Security Filter
└── README.md             # Documentation
```

---

## ⚙️ ML Integration Pipeline & Data Flow

1. Pengguna mengirimkan 27 fitur perilaku melalui frontend (Daily Check-In).
2. Backend menerima payload, melakukan validasi Mongoose, lalu meneruskan request ke layanan ML.
3. FastAPI menerima payload dan menerapkan preprocessing menggunakan scaler dan encoder hasil training.
4. Model TensorFlow menghasilkan klasifikasi risiko burnout beserta confidence score.
5. Backend menyimpan hasil ke MongoDB Atlas.
6. Frontend menarik data terbaru untuk menampilkan hasil analitik, insight (XAI), dan rekomendasi pemulihan.

---

## 🌐 API Endpoints

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | `/api/auth/register`     | Registrasi akun pengguna baru           |
| POST   | `/api/auth/login`        | Autentikasi pengguna dan penerbitan JWT |
| PUT    | `/api/users/onboarding`  | Pengiriman data onboarding pengguna     |
| GET    | `/api/users/profile`     | Mengambil profil pengguna aktif         |
| GET    | `/api/dashboard`         | Mengambil data dashboard dan analitik   |
| POST   | `/api/dashboard/checkin` | Mengirim data Daily Check-In ke AI      |

---

## 🔒 Security Protocol

Pastikan `.gitignore` mengecualikan file berikut:

* `.env`
* `node_modules/`
* `venv/`
* `.venv/`
* cache training model
* file sementara machine learning

---

## 🛠️ Local Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd lowcortisol-monorepo
```

### 2. Backend Initialization

```bash
cd backend
npm install
```

Buat file `backend/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>
PORT=5000
JWT_SECRET=<your_secret_key>
ML_API_URL=https://jikatakiri45-lowcortisol-api.hf.space/predict
```

Jalankan backend:

```bash
npm run dev
```

Backend akan berjalan pada:

```text
http://localhost:5000
```

### 3. Frontend Initialization

```bash
cd frontend
npm install
```

Buat file `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Jalankan frontend:

```bash
npm run dev
```

Frontend akan berjalan pada:

```text
http://localhost:5173
```

> ML Service tetap menggunakan endpoint Hugging Face Production agar pengembangan lokal tidak memerlukan instalasi TensorFlow secara penuh.

---

## 📊 Current System Capabilities

* Decentralized Deployment Architecture
* Behavioral Burnout Prediction
* Explainable AI (XAI) Insights
* Recovery Protocol Recommendation Engine
* MongoDB Atlas Integration
* JWT Authentication & Authorization
* RESTful API Architecture
* React-Based Interactive Dashboard
* TensorFlow-Based Machine Learning Inference
* Cross-Service Communication via FastAPI

---

## 🧑‍💻 Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Phosphor Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)

### Machine Learning

* TensorFlow / Keras
* Scikit-Learn
* FastAPI
* Uvicorn

### Deployment

* Vercel
* Render
* Hugging Face Spaces

### N8N
https://drive.google.com/drive/folders/14ssML-sMt-ezrrX4QV0LgcZsArbm-AZ0?usp=sharing 

---

## 📄 License

This project is developed for educational, research, and workplace wellness analytics purposes.
