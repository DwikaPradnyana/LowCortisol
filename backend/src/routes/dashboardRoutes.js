const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { submitCheckIn, getDashboardData } = require('../controllers/dashboardController');

router.use(protect); 

router.post('/checkin', submitCheckIn);
router.get('/', getDashboardData);

module.exports = router;