const httpStatus = require('http-status');

const { User } = require('../db/models');
const ApiError = require('../utils/ApiError');

const createUser = async (userData) => {
  if (await User.emailIsTaken(userData.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const createdUser = await User.create(userData);
  return createdUser;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserProfile,
};
