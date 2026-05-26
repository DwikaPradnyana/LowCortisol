const User = require('../models/User');

// @desc    Get data profil user yang sedang login
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password_hash');
    
    if (user) {
      res.status(200).json({
        status: 'success',
        data: user
      });
    } else {
      res.status(404).json({ error: 'User tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan server', detail: error.message });
  }
};

// @desc    Submit data onboarding (12 Variabel Statis ML)
// @route   PUT /api/users/onboarding
// @access  Private
exports.submitOnboarding = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      jenis_kelamin, usia, pendidikan_terakhir, status_pernikahan,
      departemen, lama_bekerja_tahun, tipe_perusahaan, status_wfh,
      status_merokok, riwayat_kesehatan_mental, keamanan_pekerjaan, frekuensi_konflik_kerja
    } = req.body;

    if (
      !jenis_kelamin || !usia || !pendidikan_terakhir || !status_pernikahan ||
      !departemen || lama_bekerja_tahun == null || !tipe_perusahaan || !status_wfh ||
      !status_merokok || !riwayat_kesehatan_mental || !keamanan_pekerjaan || frekuensi_konflik_kerja == null
    ) {
      return res.status(400).json({ error: 'Seluruh 12 data profil wajib diisi.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        jenis_kelamin, usia, pendidikan_terakhir, status_pernikahan,
        departemen, lama_bekerja_tahun, tipe_perusahaan, status_wfh,
        status_merokok, riwayat_kesehatan_mental, keamanan_pekerjaan, frekuensi_konflik_kerja,
        onboarding_completed: true
      },
      { new: true, runValidators: true } 
    ).select('-password_hash');

    if (updatedUser) {
      res.status(200).json({
        status: 'success',
        data: updatedUser
      });
    } else {
      res.status(404).json({ error: 'User tidak ditemukan saat update' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: 'Validasi Gagal', detail: messages });
    }
    res.status(500).json({ error: 'Gagal memproses data onboarding', detail: error.message });
  }
};

// @desc    Update profile user
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      name,
      departemen,
      status_wfh
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        departemen,
        status_wfh
      },
      {
        new: true,
        runValidators: true
      }
    ).select('-password_hash');

    if (updatedUser) {
      res.status(200).json({
        status: 'success',
        data: updatedUser
      });
    } else {
      res.status(404).json({
        error: 'User tidak ditemukan'
      });
    }

  } catch (error) {
    res.status(500).json({
      error: 'Gagal update profile',
      detail: error.message
    });
  }
};