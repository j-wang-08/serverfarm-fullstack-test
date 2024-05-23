const router = require("express").Router();
const { login, register } = require("../controllers/auth.controller");

// login route
router.post("/login", login);

// register route
router.post("/register", register);

module.exports = router;
