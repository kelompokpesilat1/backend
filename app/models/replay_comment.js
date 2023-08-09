'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Replay_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Replay_comment.belongsTo(models.Comments,{ foreignKey: 'id_comment'})
      Replay_comment.belongsTo(models.User,{ foreignKey: 'id_user'})
    }
  }
  Replay_comment.init({
    id_comment: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    replay: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Replay_comment',
  });
  return Replay_comment;
};