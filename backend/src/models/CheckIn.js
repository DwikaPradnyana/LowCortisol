const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    // Format YYYY-MM-DD agar mudah di-query (contoh: "2026-05-17")
    type: String, 
    required: true
  },
  workHours: {
    type: Number,
    required: true
  },
  sleepHours: {
    type: Number,
    required: true
  },
  cognitiveLoad: {
    type: Number,
    required: true
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
  timestamps: true // Otomatis catat waktu pembuatan
});

// Mencegah duplikasi Check-In di hari yang sama untuk user yang sama
checkInSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CheckIn', checkInSchema);