const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { submitCheckIn, getDashboardData } = require('../controllers/dashboardController');

// Semua rute di file ini membutuhkan autentikasi (protect)
router.use(protect); 

// Memetakan endpoint ke controller
router.post('/checkin', submitCheckIn);
router.get('/', getDashboardData);

module.exports = router;