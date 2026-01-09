const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {}

  Product.init(
    {
      name: DataTypes.STRING,
      sku: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products'
    }
  );

  return Product;
};
