const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ error: 'Tidak memiliki otorisasi, user tidak ditemukan.' });
      }

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