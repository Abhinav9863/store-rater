const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/storeOwnerController');
const { protect } = require('../middleware/authMiddleware'); // We'll add an isStoreOwner middleware later

// GET /api/store-owner/dashboard
router.route('/dashboard').get(protect, getDashboardData);

module.exports = router;