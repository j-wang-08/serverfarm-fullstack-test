const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/jwtConfig");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    let user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(403).json({ message: "Incorrect password" });
      }
      if (result) {
        let payload = { user };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.status(200).json({ message: "ok", token });
      } else {
        return res.status(403).json({ message: "Incorrect password" });
      }
    });
  }
};

const register = async (req, res) => {
  const user = await getUserByEmail(req.body.email);

  if (user) return res.status(409).json({ message: "Email already exists" });

  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    }).then((user) =>
      res.status(200).json({ user, message: "User registered sucessfully" })
    );
  });
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};

const createUser = async ({ firstName, lastName, email, password }) => {
  return await User.create({ firstName, lastName, email, password });
};

module.exports = { login, register };
