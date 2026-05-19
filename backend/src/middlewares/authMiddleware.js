const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Memeriksa keberadaan token di header Authorization (Format: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ekstrak token dari string 'Bearer token_string'
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari user di database berdasarkan ID yang ada di dalam token
      // Gunakan .select('-password') agar password hash tidak ikut terbawa ke req.user
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ error: 'Tidak memiliki otorisasi, user tidak ditemukan.' });
      }

      // Lanjut ke controller berikutnya jika semua valid
      next();
    } catch (error) {
      console.error('[AUTH ERROR]:', error.message);
      return res.status(401).json({ error: 'Tidak memiliki otorisasi, token gagal divalidasi.' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Tidak memiliki otorisasi, token tidak disertakan.' });
  }
};

module.exports = { protect };