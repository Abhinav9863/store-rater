const { Store, Rating, User, sequelize } = require('../db');

// @desc    Get dashboard data for the logged-in store owner
// @route   GET /api/store-owner/dashboard
// @access  Private/StoreOwner
exports.getDashboardData = async (req, res) => {
    try {
        const store = await Store.findOne({ where: { ownerId: req.user.id } });

        if (!store) {
            return res.status(404).json({ message: 'No store found for this owner.' });
        }

        const averageRatingResult = await Rating.findOne({
            where: { storeId: store.id },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'overallRating']
            ],
            raw: true
        });
        
        const ratingsList = await Rating.findAll({
            where: { storeId: store.id },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });
        
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

// @desc    Get rating distribution for the store owner's store
// @route   GET /api/store-owner/dashboard/rating-distribution
// @access  Private/StoreOwner
exports.getRatingDistribution = async (req, res) => {
    try {
        const store = await Store.findOne({ where: { ownerId: req.user.id } });

        if (!store) {
            return res.status(404).json({ message: 'No store found for this owner.' });
        }

        const distribution = await Rating.findAll({
            where: { storeId: store.id },
            attributes: [
                'rating',
                [sequelize.fn('COUNT', sequelize.col('rating')), 'count']
            ],
            group: ['rating'],
            order: [['rating', 'ASC']]
        });

        res.json(distribution);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};