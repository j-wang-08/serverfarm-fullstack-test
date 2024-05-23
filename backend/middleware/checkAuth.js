const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || "serverfarm_secret";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authication failed",
    });
  }
};
