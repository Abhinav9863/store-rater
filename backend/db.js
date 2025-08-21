// backend/db.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
);

const db = {};

// Attach the sequelize instance and library
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
db.User = require('./models/User')(sequelize);
db.Store = require('./models/Store')(sequelize);
db.Rating = require('./models/Rating')(sequelize);

// --- IMPORTANT: Define Model Associations ---
// A Store can have many Ratings
db.Store.hasMany(db.Rating, { foreignKey: 'storeId', as: 'Ratings' });
db.Rating.belongsTo(db.Store, { foreignKey: 'storeId' });

// A User can have many Ratings
db.User.hasMany(db.Rating, { foreignKey: 'userId' });
db.Rating.belongsTo(db.User, { foreignKey: 'userId' });

// Export the full db object with models and associations
module.exports = db;