# LowCortisol – Data Science Workspace

Branch: `feat/data-scientist`

Repository ini digunakan oleh tim Data Science untuk melakukan eksplorasi data, pembersihan data, analisis statistik, feature engineering, serta eksperimen model machine learning pada proyek LowCortisol.

---

## Tujuan

Membangun dataset yang berkualitas dan menghasilkan insight yang dapat digunakan oleh tim AI untuk mengembangkan model prediksi risiko burnout.

Aktivitas utama:

- Data cleaning
- Exploratory Data Analysis (EDA)
- Feature engineering
- Dataset validation
- Eksperimen machine learning
- Evaluasi performa model
- Dokumentasi hasil penelitian

---

# Struktur Folder

```text
DataScientist/
│
├── NotebookAI.ipynb
├── NotebookAIBaru.ipynb
├── NotebookKaggle.ipynb
│
├── dashboard.py
│
├── dataAI.csv
├── dataAI_cleaned.csv
│
├── dataAIBaru.csv
├── dataAIBaru_cleaned.csv
│
├── dataKaggle.csv
├── dataKaggle_clean.csv
│
├── dataDictionary.xlsx
│
└── README.md
```

---

# Deskripsi File

## Notebook

### NotebookAI.ipynb

Notebook eksperimen awal untuk:

- Exploratory Data Analysis (EDA)
- Preprocessing
- Eksperimen model awal

---

### NotebookAIBaru.ipynb

Versi pengembangan lanjutan dari notebook sebelumnya.

Biasanya digunakan untuk:

- Feature engineering baru
- Optimasi preprocessing
- Perbandingan pendekatan model

---

### NotebookKaggle.ipynb

Notebook khusus untuk eksplorasi dataset Kaggle.

Digunakan untuk:

- Analisis karakteristik data
- Seleksi fitur
- Evaluasi kualitas dataset eksternal

---

## Dataset

### dataAI.csv

Dataset mentah internal yang digunakan dalam penelitian.

---

### dataAI_cleaned.csv

Versi dataset internal yang telah melalui:

- Missing value handling
- Outlier handling
- Data normalization
- Data consistency checking

---

### dataAIBaru.csv

Dataset internal versi terbaru sebelum preprocessing.

---

### dataAIBaru_cleaned.csv

Versi bersih dari dataset terbaru yang siap digunakan untuk eksperimen model.

---

### dataKaggle.csv

Dataset sumber dari Kaggle.

---

### dataKaggle_clean.csv

Dataset Kaggle setelah proses cleaning dan validasi.

---

## Dokumentasi Data

### dataDictionary.xlsx

Dokumentasi seluruh fitur yang digunakan dalam penelitian.

Berisi:

- Nama variabel
- Tipe data
- Deskripsi fitur
- Rentang nilai
- Kategori data

Dokumen ini menjadi referensi utama dalam proses preprocessing dan interpretasi model.

---

## Dashboard

### dashboard.py

Dashboard analitik sederhana untuk visualisasi dataset.

Fungsi:

- Monitoring distribusi data
- Visualisasi statistik
- Analisis hasil preprocessing

---

# Workflow Data Science

```text
Raw Dataset
     │
     ▼
Data Cleaning
     │
     ▼
EDA
     │
     ▼
Feature Engineering
     │
     ▼
Dataset Validation
     │
     ▼
Model Experiment
     │
     ▼
Evaluation
     │
     ▼
Export to AI Team
```

---

# Dataset Sources

Data yang digunakan dalam penelitian berasal dari:

- Dataset internal LowCortisol
- Dataset publik Kaggle
- Dataset hasil integrasi dan pembersihan lanjutan

---

# Catatan

Folder ini hanya digunakan untuk aktivitas Data Science.

Model produksi yang digunakan oleh backend dan deployment AI berada pada branch:

- `feat/ai-integration`

Tim Data Science berfokus pada:

- Dataset preparation
- Statistical analysis
- Research experimentation
- Model development support

---

# Project

LowCortisol

AI-based Burnout Risk Detection System

Capstone Project – DBS Foundation Coding Camp 2026
