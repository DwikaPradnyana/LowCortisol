const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama wajib diisi'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email wajib diisi'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password wajib diisi'],
      minlength: [6, 'Password minimal 6 karakter'],
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    jenis_kelamin: {
      type: String,
      enum: ['Laki-laki', 'Perempuan'],
    },
    usia: {
      type: Number,
      min: [15, 'Usia minimal 15 tahun'],
      max: [70, 'Usia maksimal 70 tahun'],
    },
    pendidikan_terakhir: {
      type: String,
      enum: ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'],
    },
    status_pernikahan: {
      type: String,
      enum: ['Belum Menikah', 'Menikah', 'Cerai/Duda/Janda'],
    },
    departemen: {
      type: String,
      enum: ['Engineering', 'Hr', 'Product', 'Data', 'Finance', 'Sales', 'Operations', 'It', 'Marketing'],
    },
    lama_bekerja_tahun: {
      type: Number,
      min: [0, 'Lama bekerja tidak boleh negatif'],
      max: [50, 'Lama bekerja tidak masuk akal (maksimal 50 tahun)'],
    },
    tipe_perusahaan: {
      type: String,
      enum: ['Swasta', 'BUMN', 'Startup', 'Freelance'],
    },
    status_wfh: {
      type: String,
      enum: ['Ya', 'Tidak', 'Hybrid'],
    },
    status_merokok: {
      type: String,
      enum: ['Tidak', 'Ya', 'Kadang'],
    },
    riwayat_kesehatan_mental: {
      type: String,
      enum: ['Tidak Ada', 'Pernah Depresi', 'Kecemasan'],
    },
    keamanan_pekerjaan: {
      type: String,
      enum: ['Tidak Aman', 'Cukup Aman', 'Aman', 'Sangat Aman'],
    },
    frekuensi_konflik_kerja: {
      type: Number,
      min: [1, 'Skala konflik minimal 1'],
      max: [10, 'Skala konflik maksimal 10'],
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;