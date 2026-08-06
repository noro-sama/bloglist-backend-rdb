const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'username must be a valid email address',
        },
      },
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING(60),
      validate: {
        len: [60, 60],
        is: /^[./0-9A-Za-z$]+$/,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  },
);

module.exports = User;
