// backend/routes/storeRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllStores,
    createStore,
    updateStore,
    deleteStore,
    createStoreRating // Import the new function
} = require('../controllers/storeController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public route - anyone can see the stores
router.route('/').get(getAllStores);

// Admin-only routes for creating, updating, and deleting stores
router.route('/').post(protect, isAdmin, createStore);
router.route('/:id').put(protect, isAdmin, updateStore);
router.route('/:id').delete(protect, isAdmin, deleteStore);

// --- NEW ROUTE ---
// Private route for any logged-in user to create a rating
router.route('/:id/ratings').post(protect, createStoreRating);

module.exports = router;