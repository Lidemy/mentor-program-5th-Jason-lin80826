'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prize_prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  prize_prize.init({
    prizeName: DataTypes.STRING,
    Url: DataTypes.STRING,
    content: DataTypes.TEXT,
    probability: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'prize_prize',
  });
  return prize_prize;
};