const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');

const version = catchAsync(async (req, res) => {
  const apiVersion = '1.0';
  res.status(httpStatus.OK).send({ apiVersion });
});

module.exports = {
  version,
};
