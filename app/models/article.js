/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.hasMany(models.Comments, {
        foreignKey: 'id_article',
      });
      Article.belongsTo(models.Category, {
        foreignKey: 'id_category',
      });
      Article.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
    }
  }
  Article.init({
    id_user: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    viewers: DataTypes.INTEGER,
    cover: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
