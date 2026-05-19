const User = require('../models/User');

// @desc    Get data profil user yang sedang login
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    // req.user telah diinjeksi oleh authMiddleware (protect) jika token valid
    const user = await User.findById(req.user._id).select('-password');
    
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