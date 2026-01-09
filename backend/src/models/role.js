console.log('🔥 ROLE.JS DIPAKAI DARI:', __filename);

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });
};
