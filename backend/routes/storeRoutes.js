const express = require('express');
const router = express.Router();
const {
    getAllStores,
    createStore,
    updateStore,
    deleteStore,
    createStoreRating
} = require('../controllers/storeController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public route
router.route('/').get(getAllStores);

// Private route for users to rate a store
router.route('/:id/ratings').post(protect, createStoreRating);

// Admin-only routes
router.route('/').post(protect, isAdmin, createStore);
router.route('/:id').put(protect, isAdmin, updateStore);
router.route('/:id').delete(protect, isAdmin, deleteStore);

module.exports = router;