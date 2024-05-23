module.exports = {
  url: `${process.env.MONGODB_URL || "mongodb://127.0.0.1:27017"}/${
    process.env.MONGODB_DATABASE || "serverfarm_db"
  }`,
};
