const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SEO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SEO.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    logo: DataTypes.STRING,
    keywords: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SEO',
  });
  return SEO;
};
