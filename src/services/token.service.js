const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

const generateToken = (userId, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.access_expiration_minutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateAuthTokens,
};
