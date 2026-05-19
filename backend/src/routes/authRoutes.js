const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Pemetakan Route ke Controller
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;