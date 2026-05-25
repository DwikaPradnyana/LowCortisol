const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },

  jam_kerja_per_hari: { type: Number, required: true },
  jam_lembur_per_hari: { type: Number, default: null },
  jam_tidur_per_hari: { type: Number, required: true },
  kualitas_tidur: { type: Number, default: null },
  jam_layar_per_hari: { type: Number, default: null },
  tingkat_stres: { type: Number, required: true },
  kepuasan_kerja: { type: Number, default: null },
  work_life_balance: { type: Number, default: null },
  produktivitas_diri: { type: Number, required: true },
  dukungan_atasan: { type: Number, default: null },
  frekuensi_meeting_per_hari: { type: Number, default: null },
  
  beban_kerja_persepsi: { 
    type: String, 
    required: true,
    enum: ['Ringan', 'Sedang', 'Berat', 'Sangat Berat'] 
  },
  keluhan_fisik_utama: { 
    type: String, 
    enum: ['Tidak Ada', 'Sakit Kepala', 'Nyeri Punggung', 'Mata Lelah', 'Kelelahan'],
    default: 'Tidak Ada'
  },
  
  frekuensi_olahraga_per_minggu: { type: Number, default: null },
  jumlah_deadline_per_minggu: { type: Number, default: null },

  fatigueRisk: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  insight: { type: String } 
}, { 
  timestamps: true 
});

checkInSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CheckIn', checkInSchema);