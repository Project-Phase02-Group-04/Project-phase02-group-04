'use strict';
const {
  Model
} = require('sequelize');
const {hashing} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    hobbies: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};