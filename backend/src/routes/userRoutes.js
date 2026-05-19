const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Rute ini dilindungi. Klien wajib membawa Bearer Token.
router.get('/profile', protect, getUserProfile);

module.exports = router;