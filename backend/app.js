const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const User = require("./models/User");
const { strategy } = require("./config/jwtConfig");

// configure cors
app.use(cors());

// configure req body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create mysql db
const mysqlDb = require("./config/database/mysql.conf");

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

// use the passport strategy
passport.use("strategy", strategy);

// auth routes
app.use("/api/auth", authRoutes);

// test app
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
