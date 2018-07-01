const jwt = require('jsonwebtoken');
const jwtConfig = require('./../../service/jwt');

function tokenForUser(user, callback) {
  return jwt.sign({ user: user._id }, jwtConfig.jwtSecret, callback);
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(req.originalUrl);
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log(bearerToken);
    req.token = bearerToken;
    next();
  } else if (req.originalUrl.indexOf('authenticate') !== -1) {
    next();
  } else {
    res.status(403).json({ message: 'forbidden' });
  }
}

module.exports = {
  tokenForUser,
  verifyToken,
  jwtSecret: jwtConfig.jwtSecret,
};
