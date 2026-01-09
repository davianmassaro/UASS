const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaction extends Model {}

  Transaction.init(
    {
      type: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions'
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Product, { foreignKey: 'product_id' });
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Transaction;
};
