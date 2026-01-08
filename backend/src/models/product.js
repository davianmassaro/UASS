const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  sku: {
    type: DataTypes.STRING,
    unique: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  price: DataTypes.INTEGER
});

module.exports = Product;
