/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.hasMany(models.User, {
        foreignKey: 'id_user',
      });
    }
  }
  Comments.init({
    id_user: DataTypes.INTEGER,
    id_article: DataTypes.INTEGER,
    commentar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
