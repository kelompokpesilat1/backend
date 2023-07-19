'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    id_user: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    viewers: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
