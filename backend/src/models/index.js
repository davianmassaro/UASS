console.log('MODELS INDEX DIPAKAI');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = require('./role')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Transaction = require('./transaction')(sequelize, DataTypes);

/* RELASI */
db.Role.hasMany(db.User, { foreignKey: 'role_id' });
db.User.belongsTo(db.Role, { foreignKey: 'role_id' });
db.Transaction.belongsTo(db.Product, { foreignKey: 'product_id' });
db.Transaction.belongsTo(db.User, { foreignKey: 'user_id' });


module.exports = db;
