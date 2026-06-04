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

```http
GET https://lowcortisol-api.onrender.com/api/health
```

---

## 📂 Monorepo Structure

```text
lowcortisol-monorepo/
│
├── DataScientist/        # Dataset, EDA, Analytics
├── ai-services/          # Model Training, Scaler, Encoder
├── backend/              # Node.js REST API
├── frontend/             # React Application
├── hugging-face/         # FastAPI Production Model
├── .gitignore
└── README.md
```

---

## ⚙️ ML Integration Pipeline & Data Flow

Sistem inferensi mengikuti alur data sebagai berikut:

1. Pengguna mengirimkan 27 fitur perilaku melalui frontend (Daily Check-In).
2. Backend menerima payload, melakukan validasi, lalu meneruskan request ke layanan ML.
3. FastAPI menerima payload dan menerapkan preprocessing menggunakan scaler dan encoder hasil training.
4. Model TensorFlow menghasilkan klasifikasi risiko burnout beserta confidence score.
5. Backend menyimpan hasil ke MongoDB Atlas.
6. Frontend menampilkan hasil analitik, insight, dan rekomendasi pemulihan.

---

## 🔒 Security Protocol

File konfigurasi sensitif tidak boleh dilacak oleh Git.

Pastikan `.gitignore` mengecualikan:

* `.env`
* `node_modules/`
* `venv/`
* `.venv/`
* file model sementara atau cache training

---

## 🛠️ Local Development Setup

### Backend Environment (`backend/.env`)

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>
PORT=5000
JWT_SECRET=<your_secret_key>
ML_API_URL=https://jikatakiri45-lowcortisol-api.hf.space/predict
```

### Frontend Environment (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

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

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

### Machine Learning

* TensorFlow / Keras
* Scikit-Learn
* FastAPI
* Hugging Face Spaces

### Deployment

* Vercel
* Render
* Hugging Face Spaces

---

## 📄 License

This project is developed for educational, research, and workplace wellness analytics purposes.
