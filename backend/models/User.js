const { DataTypes } = require('sequelize');

// This function will define the model and we will call it from our db connection file
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(400)
        },
        role: {
            type: DataTypes.ENUM('System Administrator', 'Normal User', 'Store Owner'),
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    return User;
};