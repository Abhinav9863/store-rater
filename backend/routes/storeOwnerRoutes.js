const express = require('express');
const router = express.Router();
const { getDashboardData, getRatingDistribution } = require('../controllers/storeOwnerController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/store-owner/dashboard
router.route('/dashboard').get(protect, getDashboardData);

// GET /api/store-owner/dashboard/rating-distribution
router.route('/dashboard/rating-distribution').get(protect, getRatingDistribution);

module.exports = router;