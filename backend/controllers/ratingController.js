const { Rating } = require('../db');

// @desc    Get all ratings submitted by the logged-in user
// @route   GET /api/ratings/my-ratings
// @access  Private
exports.getMyRatings = async (req, res) => {
  try {
    const userRatings = await Rating.findAll({
      where: { userId: req.user.id },
    });
    res.json(userRatings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a rating for a store
// @route   PUT /api/ratings/:storeId
// @access  Private
exports.updateMyRating = async (req, res) => {
    const { rating } = req.body;
    const { storeId } = req.params;

    try {
        const existingRating = await Rating.findOne({
            where: {
                storeId: storeId,
                userId: req.user.id
            }
        });

        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
            res.json(existingRating);
        } else {
            res.status(404).json({ message: 'Rating not found for this store.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};