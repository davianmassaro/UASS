// src/models/transaction.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Transaction extends Model {}

    Transaction.init({
        type: {
            type: DataTypes.ENUM('IN', 'OUT'),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions'
    });

    return Transaction;
};