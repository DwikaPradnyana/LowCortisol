// Memuat variabel dari file .env di urutan pertama
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

// Inisialisasi Koneksi Database
connectDB();

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- MOUNT ROUTES ---
// Prefix /api/auth akan ditambahkan ke semua route di authRoutes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- ROUTES: HEALTH CHECK ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend OK' });
});

// --- ROUTES: MOCK ML PREDICTION ---
// app.post('/api/predict/checkin', (req, res) => {
//   const { workHours, sleepHours, cognitiveLoad } = req.body;
//   if (workHours == null || sleepHours == null || cognitiveLoad == null) {
//     return res.status(400).json({ error: 'Input tidak lengkap.' });
//   }

//   let riskLevel = "Low";
//   let insight = "Kualitas tidur dan jam kerjamu seimbang. Kapasitas berada di batas aman.";

//   if (workHours >= 10 || sleepHours <= 5 || cognitiveLoad >= 4) {
//     riskLevel = "High";
//     insight = "Model AI mendeteksi rasio kerja-istirahat yang ekstrem. Risiko burnout sangat tinggi.";
//   } else if (workHours > 8 || sleepHours < 7 || cognitiveLoad >= 3) {
//     riskLevel = "Medium";
//     insight = "Beban mulai terakumulasi. Pastikan mengambil jeda layar secara berkala.";
//   }

//   res.status(200).json({
//     status: 'success',
//     data: { risk: riskLevel, insight: insight, processedAt: new Date().toISOString() }
//   });
// });

// --- SERVER LISTENER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Aktif di http://localhost:${PORT}`);
});