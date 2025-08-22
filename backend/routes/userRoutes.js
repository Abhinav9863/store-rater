const express = require('express');
const router = express.Router();
const { updateUserPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// PUT /api/users/profile/password
router.route('/profile/password').put(protect, updateUserPassword);

module.exports = router;