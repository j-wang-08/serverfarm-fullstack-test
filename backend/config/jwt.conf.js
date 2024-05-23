const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET_KEY || "serverfarm_secret";

const strategy = new JWTStrategy(jwtOptions, (jwtPayload, next) => {
  const user = getUser({ id: jwtPayload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = { jwtOptions, ExtractJWT, JWTStrategy, strategy };
