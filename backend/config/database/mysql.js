const { Sequelize } = require("sequelize");

// configure mysql db connect params
const mysqlDb = new Sequelize({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
});

module.exports = mysqlDb;
