const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Register user baru
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Harap isi semua kolom (name, email, password)' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email sudah terdaftar. Silakan login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword, 
    });

    if (user) {
      const userData = { _id: user._id, name: user.name, email: user.email, role: user.role, onboarding_completed: user.onboarding_completed };
      
      res.status(201).json({
        status: 'success',
        data: {
          user: userData,
          token: generateToken(user._id),
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', detail: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Harap masukkan email dan password' });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const userData = { _id: user._id, name: user.name, email: user.email, role: user.role, onboarding_completed: user.onboarding_completed };

      res.status(200).json({
        status: 'success',
        data: {
          user: userData,
          token: generateToken(user._id),
        }
      });
    } else {
      res.status(401).json({ error: 'Email atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', detail: error.message });
  }
};