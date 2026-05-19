# LowCortisol - Full-Stack MERN Application

Repositori ini telah direstrukturisasi menjadi arsitektur **MERN Stack (MongoDB, Express, React, Node.js)** yang terintegrasi secara penuh (*End-to-End*). Fitur autentikasi berbasis JWT, pencatatan harian (*Daily Check-In*), dan sinkronisasi dasbor reaktif telah aktif menggunakan basis data *cloud*.

Folder `FE` lama telah dihapus untuk menghindari duplikasi arsitektur. Seluruh pengembangan web sekarang diisolasi ke dalam dua direktori utama:
- `/backend` : Express.js, Mongoose ODM, JWT Authentication, & Mock ML Inference Engine.
- `/frontend` : React.js (Vite), Tailwind CSS, Axios Network Interceptor.

---

## Persyaratan Sistem (Prerequisites)

Sebelum menjalankan aplikasi, pastikan mesin lokal Anda telah menginstal:
- **Node.js LTS (Versi 22.x direkomendasikan)**. Jangan gunakan Node.js v24 karena memiliki inkonsistensi pada internal DNS resolver untuk koneksi basis data.
- **NPM** (Bawaan dari instalasi Node.js).

---

## Langkah-Langkah Setup Lokal & Live Demo

Ikuti urutan eksekusi ini secara presisi. Aplikasi tidak akan berjalan jika salah satu server mati.

### 1. Sinkronisasi Cabang (Branch)
Pastikan Anda berada di cabang fitur yang benar:
```bash
git fetch origin
git checkout feat/fullstack-integration
git pull origin feat/fullstack-integration
