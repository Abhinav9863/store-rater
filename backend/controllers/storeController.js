const { Store, Rating, User, sequelize, Sequelize: { Op } } = require('../db');

// @desc    Get all stores with average rating and search
// @route   GET /api/stores
// @access  Public
exports.getAllStores = async (req, res) => {
  try {
    const { search } = req.query;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAll({
      where: whereClause,
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'overallRating']
        ]
      },
      include: [{
        model: Rating,
        as: 'Ratings',
        attributes: []
      }],
      group: ['Store.id'],
      order: [[sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'DESC NULLS LAST']]
    });
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new store
// @route   POST /api/stores
// @access  Private/Admin
exports.createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a store
// @route   PUT /api/stores/:id
// @access  Private/Admin
exports.updateStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.findByPk(req.params.id);

    if (store) {
      store.name = name || store.name;
      store.email = email || store.email;
      store.address = address || store.address;
      const updatedStore = await store.save();
      res.json(updatedStore);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a store
// @route   DELETE /api/stores/:id
// @access  Private/Admin
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);

    if (store) {
      await store.destroy();
      res.json({ message: 'Store removed' });
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new rating for a store
// @route   POST /api/stores/:id/ratings
// @access  Private
exports.createStoreRating = async (req, res) => {
  const { rating } = req.body;
  try {
    const store = await Store.findByPk(req.params.id);
    if (store) {
      const existingRating = await Rating.findOne({
        where: {
          storeId: req.params.id,
          userId: req.user.id
        }
      });
      if (existingRating) {
        return res.status(400).json({ message: 'You have already rated this store' });
      }
      const newRating = await Rating.create({
        rating,
        storeId: req.params.id,
        userId: req.user.id
      });
      res.status(201).json(newRating);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};