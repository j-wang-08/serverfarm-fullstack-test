const mongodbConfig = require("../config/database/mongodb.conf");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongodb = {};
mongodb.mongoose = mongoose;
mongodb.url = mongodbConfig.url;
mongodb.posts = require("./Post")(mongoose);

module.exports = mongodb;
