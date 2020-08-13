const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const index = catchAsync(async (req, res) => {
  const data = await userService.getAllUsers();
  res.send(data);
});

module.exports = {
  index,
};
