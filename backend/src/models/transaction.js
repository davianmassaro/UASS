const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false
    },
    quantity: DataTypes.INTEGER
});

Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Transaction, { foreignKey: 'user_id' });
Product.hasMany(Transaction, { foreignKey: 'product_id' });

module.exports = Transaction;