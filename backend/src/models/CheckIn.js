const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },

  jam_kerja_per_hari: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  jam_tidur_per_hari: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  beban_kerja_persepsi: {
    type: String,
    required: true,
    enum: ['Ringan', 'Sedang', 'Berat', 'Sangat Berat']
  },
  tingkat_stres: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  produktivitas_diri: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },

  jam_lembur_per_hari: {
    type: Number,
    required: false, 
    min: 0,
    max: 16,
    default: null
  },
  jam_layar_per_hari: {
    type: Number,
    required: false,
    min: 0,
    max: 24,
    default: null
  },
  kualitas_tidur: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
    default: null
  },
  kepuasan_kerja: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
    default: null
  },
  work_life_balance: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
    default: null
  },
  dukungan_atasan: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
    default: null
  },
  frekuensi_meeting_per_hari: {
    type: Number,
    required: false,
    min: 0,
    max: 20,
    default: null
  },
  keluhan_fisik_utama: {
    type: String,
    required: false,
    enum: ['Tidak Ada', 'Sakit Kepala', 'Nyeri Punggung', 'Mata Lelah', 'Kelelahan'],
    default: null
  },

  fatigueRisk: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  insight: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

checkInSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CheckIn', checkInSchema);