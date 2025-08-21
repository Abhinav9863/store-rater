const { User } = require('../db'); // Ensure this line is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Logic
exports.signup = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: 'Normal User'
        });

        res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login Logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Sign the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: user.role });
            }
        );

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};