const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        address: {
            type: DataTypes.STRING(400),
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users', // table name
                key: 'id'
            }
        }
    }, {
        tableName: 'stores',
        timestamps: false
    });

    return Store;
};