const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const checkAuth = require("./middleware/checkAuth");
const User = require("./models/User");
const mongodb = require("./models");
const { strategy } = require("./config/jwt.conf");

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

// test mongodb connect
mongodb.mongoose
  .connect(mongodb.url)
  .then(() => {
    console.log("Mongodb database connected...");
  })
  .catch((err) => {
    console.log(`Mongodb Connect Error ->>> ${err}`);
  });

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

// post routes
app.use("/api/posts", checkAuth, postRoutes);

// test app
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
