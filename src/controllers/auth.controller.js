const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { userService, authService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.sendStatus(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(req.body);
  const token = await tokenService.generateAuthTokens(user);
  res.send({ user, token });
});

module.exports = {
  register,
  login,
};
