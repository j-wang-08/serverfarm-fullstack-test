const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

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

// test app
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
