const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getAllUsers = catchAsync(async (req, res) => {
  const data = await userService.getAllUsers();
  res.send(data);
});

const createUser = catchAsync(async (req, res) => {
  const reqData = req.body;
  const user = await userService.createUser(reqData);
  res.status(httpStatus.CREATED).send(user);
});

const getUserProfile = catchAsync(async (req, res) => {
  const data = await userService.getUserProfile(req.params.userId);
  res.send(data);
});

module.exports = {
  getAllUsers,
  createUser,
  getUserProfile,
};
