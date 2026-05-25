const axios = require('axios');

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000/predict';

const DEFAULT_CATEGORIES = {
  JENIS_KELAMIN: "Laki-laki",
  PENDIDIKAN: "S1",
  PERNIKAHAN: "Belum Menikah",
  DEPARTEMEN: "IT",
  TIPE_PERUSAHAAN: "Swasta",
  STATUS_WFH: "Hybrid",
  BEBAN_KERJA: "Sedang",
  MEROKOK: "Tidak",
  RIWAYAT_MENTAL: "Tidak Ada",
  KELUHAN_FISIK: "Tidak Ada",
  KEAMANAN_KERJA: "Aman"
};

const parseIntSafe = (value, fallback) => {
  if (value === null || value === undefined || String(value).trim() === '') return fallback;
  const parsed = Math.round(Number(value));
  return isNaN(parsed) ? fallback : parsed;
};

const parseStrSafe = (value, fallback) => {
  if (value === null || value === undefined || String(value).trim() === '') return fallback;
  return String(value).trim();
};

exports.classifyBurnoutRisk = async (userProfile = {}, checkInPayload = {}) => {
  try {
    const mlPayload = {
      jenis_kelamin: parseStrSafe(userProfile.jenis_kelamin, DEFAULT_CATEGORIES.JENIS_KELAMIN),
      usia: parseIntSafe(userProfile.usia, 25),
      pendidikan_terakhir: parseStrSafe(userProfile.pendidikan_terakhir, DEFAULT_CATEGORIES.PENDIDIKAN),
      status_pernikahan: parseStrSafe(userProfile.status_pernikahan, DEFAULT_CATEGORIES.PERNIKAHAN),
      departemen: parseStrSafe(userProfile.departemen, DEFAULT_CATEGORIES.DEPARTEMEN),
      lama_bekerja_tahun: parseIntSafe(userProfile.lama_bekerja_tahun, 2),
      tipe_perusahaan: parseStrSafe(userProfile.tipe_perusahaan, DEFAULT_CATEGORIES.TIPE_PERUSAHAAN),
      status_wfh: parseStrSafe(userProfile.status_wfh, DEFAULT_CATEGORIES.STATUS_WFH),
      status_merokok: parseStrSafe(userProfile.status_merokok, DEFAULT_CATEGORIES.MEROKOK),
      riwayat_kesehatan_mental: parseStrSafe(userProfile.riwayat_kesehatan_mental, DEFAULT_CATEGORIES.RIWAYAT_MENTAL),
      keamanan_pekerjaan: parseStrSafe(userProfile.keamanan_pekerjaan, DEFAULT_CATEGORIES.KEAMANAN_KERJA),
      frekuensi_konflik_kerja: parseIntSafe(userProfile.frekuensi_konflik_kerja, 0),

      jam_kerja_per_hari: parseIntSafe(checkInPayload.jam_kerja_per_hari, 8),
      jam_tidur_per_hari: parseIntSafe(checkInPayload.jam_tidur_per_hari, 7),
      tingkat_stres: parseIntSafe(checkInPayload.tingkat_stres, 5),
      produktivitas_diri: parseIntSafe(checkInPayload.produktivitas_diri, 7),
      beban_kerja_persepsi: parseStrSafe(checkInPayload.beban_kerja_persepsi, DEFAULT_CATEGORIES.BEBAN_KERJA),
      
      jam_lembur_per_hari: parseIntSafe(checkInPayload.jam_lembur_per_hari, 0),
      jam_layar_per_hari: parseIntSafe(checkInPayload.jam_layar_per_hari, 8),
      kualitas_tidur: parseIntSafe(checkInPayload.kualitas_tidur, 6),
      kepuasan_kerja: parseIntSafe(checkInPayload.kepuasan_kerja, 6),
      work_life_balance: parseIntSafe(checkInPayload.work_life_balance, 5),
      dukungan_atasan: parseIntSafe(checkInPayload.dukungan_atasan, 6),
      frekuensi_meeting_per_hari: parseIntSafe(checkInPayload.frekuensi_meeting_per_hari, 2),
      keluhan_fisik_utama: parseStrSafe(checkInPayload.keluhan_fisik_utama, DEFAULT_CATEGORIES.KELUHAN_FISIK),

      frekuensi_olahraga_per_minggu: parseIntSafe(checkInPayload.frekuensi_olahraga_per_minggu, 1),
      jumlah_deadline_per_minggu: parseIntSafe(checkInPayload.jumlah_deadline_per_minggu, 2),
    };

    const response = await axios.post(ML_API_URL, mlPayload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });

    console.log("[ML RAW RESPONSE]:", JSON.stringify(response.data, null, 2));

    const burnoutLabel = response.data?.results?.prediksi_level;

    if (!burnoutLabel) {
       throw new Error("Missing 'prediksi_level' in ML response payload.");
    }

    return burnoutLabel;

  } catch (error) {
    if (error.response) {
      console.error("[ML Service Error]:", 
        typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.statusText
      );
    } else if (error.code === 'ECONNABORTED') {
      console.error("[ML Service Timeout]: FastAPI gagal merespons dalam 5000ms.");
    } else {
      console.error("[ML Service Network Error]:", error.message);
    }
    
    return 'Low'; 
  }
};