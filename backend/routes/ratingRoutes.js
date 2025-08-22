const express = require('express');
const router = express.Router();
// --- IMPORT updateMyRating ---
const { getMyRatings, updateMyRating } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

// GET all of the current user's ratings
router.route('/my-ratings').get(protect, getMyRatings);

// --- ADD THIS MISSING ROUTE ---
// PUT (update) a rating for a specific store
router.route('/:storeId').put(protect, updateMyRating);

module.exports = router;