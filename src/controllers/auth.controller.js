const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { userService, authService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(req.body);
  res.send({ user });
});

module.exports = {
  register,
  login,
};
