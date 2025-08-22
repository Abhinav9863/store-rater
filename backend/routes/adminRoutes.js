const express = require('express');
const router = express.Router();
// --- IMPORT getUsers ---
const { getStats, getUsers } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// All routes in this file are protected and admin-only
router.use(protect, isAdmin);

router.route('/stats').get(getStats);
router.route('/users').get(getUsers); // --- ADD THIS ROUTE ---

module.exports = router;