// backend/index.js

const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.send('Store Rating API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    // Corrected this line with backticks
    console.log(`🚀 Server is running on port ${PORT}`);
    try {
        await db.sequelize.authenticate();
        console.log('✅ PostgreSQL Connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
});