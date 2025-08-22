const { Store, Rating, User } = require('../db');
const { sequelize } = require('../db');

// @desc    Get dashboard data for the logged-in store owner
// @route   GET /api/store-owner/dashboard
// @access  Private/StoreOwner
exports.getDashboardData = async (req, res) => {
    try {
        const store = await Store.findOne({ where: { ownerId: req.user.id } });

        if (!store) {
            return res.status(404).json({ message: 'No store found for this owner.' });
        }

        // --- THIS QUERY IS NOW FIXED ---
        const averageRatingResult = await Rating.findOne({
            where: { storeId: store.id },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'overallRating']
            ],
            raw: true
        });

        // Get all ratings for this store, including the user who submitted it
        const ratingsList = await Rating.findAll({
            where: { storeId: store.id },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });
        
        // Combine the store details with the calculated average rating
        const responseData = {
            storeDetails: {
                ...store.toJSON(),
                overallRating: averageRatingResult.overallRating || 0
            },
            ratings: ratingsList
        };

        res.json(responseData);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};