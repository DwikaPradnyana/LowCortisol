const express = require('express');
const router = express.Router();
const { getUserProfile, submitOnboarding } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/profile', getUserProfile);
router.put('/onboarding', submitOnboarding);

module.exports = router;