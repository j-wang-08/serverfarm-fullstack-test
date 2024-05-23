const { Sequelize, DataTypes } = require("sequelize");
const mysqlDb = require("../config/database/mysql.conf");

const User = mysqlDb.define("user", {
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
