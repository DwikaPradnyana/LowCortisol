const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
   },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password_hash: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  onboarding_completed: { 
    type: Boolean, 
    default: false 
  },

  jenis_kelamin: { 
    type: String, 
    enum: ['Laki-laki', 'Perempuan'] 
  },
  usia: { 
    type: Number 
  },
  pendidikan_terakhir: { 
    type: String, 
    enum: ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'] 
  },
  status_pernikahan: { 
    type: String, 
    enum: ['Belum Menikah', 'Menikah', 'Cerai/Duda/Janda'] 
  },
  departemen: { 
    type: String, 
    enum: ['Engineering', 'Hr', 'Product', 'Data', 'Finance', 'Sales', 'Operations', 'It', 'Marketing'] 
  },
  lama_bekerja_tahun: { 
    type: Number 
  },
  tipe_perusahaan: { 
    type: String, 
    enum: ['Swasta', 'BUMN', 'Startup', 'Freelance'] 
  },
  status_wfh: { 
    type: String, 
    enum: ['Ya', 'Tidak', 'Hybrid'] 
  },
  status_merokok: { 
    type: String, 
    enum: ['Tidak', 'Ya', 'Kadang'] 
  },
  riwayat_kesehatan_mental: { 
    type: String, 
    enum: ['Tidak Ada', 'Pernah Depresi', 'Kecemasan'] 
  },
  keamanan_pekerjaan: { 
    type: String, 
    enum: ['Tidak Aman', 'Cukup Aman', 'Aman', 'Sangat Aman'] 
  },
  frekuensi_konflik_kerja: { 
    type: Number 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);