module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    role_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'users'
  });

  return User;
};
