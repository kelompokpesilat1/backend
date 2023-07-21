const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      User.belongsTo(models.Roles, {
        foreignKey: 'id_roles',
      });
      User.hasMany(models.Comments, {
        foreignKey: 'id_user',
      });
      User.hasMany(models.Article, {
        foreignKey: 'id_user',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    foto: DataTypes.STRING,
    id_roles: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
