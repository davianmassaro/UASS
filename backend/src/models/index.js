const sequelize = require('../config/database');

require('./role');
require('./user');
require('./product');
require('./transaction');

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error(err));

module.exports = sequelize;
