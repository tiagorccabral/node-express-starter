const httpStatus = require('http-status');

const { User } = require('../db/models');
const ApiError = require('../utils/ApiError');

const register = async (userData) => {
  if (await User.emailIsTaken(userData.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const createdUser = await User.create(userData);
  return createdUser;
};

const loginUserWithEmailAndPassword = async (userData) => {
  const user = await User.findOne({ where: { email: userData.email } });
  if (!user || (await user.isPasswordMatch(userData.password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect e-mail or password');
  }
  return user;
};

module.exports = {
  register,
  loginUserWithEmailAndPassword,
};
