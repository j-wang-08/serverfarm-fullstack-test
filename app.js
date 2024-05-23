const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// configure cors
app.use(cors());

// configure req body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// test app
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
