const { User } = require('../db');
const bcrypt = require('bcryptjs');

// @desc    Update user password
// @route   PUT /api/users/profile/password
// @access  Private
exports.updateUserPassword = async (req, res) => {
    const { password } = req.body;

    // Validation from the PDF
    if (!password || password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: 'Password must be between 8 and 16 characters.' });
    }
    // Add more complex validation as per the PDF requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasUpperCase || !hasSpecialChar) {
        return res.status(400).json({ message: 'Password must include at least one uppercase letter and one special character.' });
    }

    try {
        const user = await User.findByPk(req.user.id);

        if (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.json({ message: 'Password updated successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};