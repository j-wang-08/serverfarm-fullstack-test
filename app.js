const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/User");

// configure cors
app.use(cors());

// configure req body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create mysql db
const mysqlDb = require("./config/database/mysql");

// test mysql connect
mysqlDb
  .authenticate()
  .then(() => {
    console.log("Mysql database connected...");
  })
  .catch((err) => console.error(`Mysql Connect Error ->>> ${err}`));

// create User table
User.sync()
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((err) => console.error(`User table creation failed ->>> ${err}`));

// test app
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
