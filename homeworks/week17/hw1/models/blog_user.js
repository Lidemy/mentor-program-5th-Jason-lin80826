'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  blog_User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'blog_User',
  });
  return blog_User;
};