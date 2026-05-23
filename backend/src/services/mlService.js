const axios = require('axios');

/**
 * Service prosedural sederhana untuk klasifikasi risiko Burnout.
 * Bertindak sebagai jembatan/proksi antara Node.js dan API Python (CNN).
 */
exports.classifyBurnoutRisk = async (payload) => {
  try {
    // ---------------------------------------------------------
    // KODE INTEGRASI ASLI (Gunakan ini saat API Python sudah siap)
    // ---------------------------------------------------------
    // const response = await axios.post('http://localhost:8000/predict', payload);
    // return response.data.risk_label; // Mengharapkan 'Low', 'Medium', atau 'High'

    // ---------------------------------------------------------
    // FALLBACK / MOCK SEMENTARA (Hingga integrasi selesai)
    // ---------------------------------------------------------
    const kerja = Number(payload.jam_kerja_per_hari) || 0;
    const tidur = Number(payload.jam_tidur_per_hari) || 0;
    const stres = Number(payload.tingkat_stres) || 0;
    const beban = payload.beban_kerja_persepsi || 'Ringan';

    if (kerja >= 12 || tidur <= 5 || stres >= 8 || beban === 'Sangat Berat') {
      return 'High';
    } 
    if (kerja > 9 || tidur < 7 || stres >= 6 || beban === 'Berat') {
      return 'Medium';
    }
    
    return 'Low';
    
  } catch (error) {
    console.error("[ML Service Error]: Gagal menghubungi model prediksi.", error.message);
    // Defensive programming: Jika server ML mati, kembalikan status teraman.
    return 'Low'; 
  }
};