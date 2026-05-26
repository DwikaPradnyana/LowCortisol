const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getUserProfile, submitOnboarding, updateProfile } = require('../controllers/userController');

router.use(protect);

router.get('/profile', getUserProfile);
router.put('/onboarding', submitOnboarding);

router.put('/profile', protect, updateProfile);

module.exports = router;