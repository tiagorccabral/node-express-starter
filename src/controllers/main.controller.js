const httpStatus = require('http-status');
const { API_VERSION } = require('../utils/constants');
const catchAsync = require('../utils/catchAsync');

const version = catchAsync(async (req, res) => {
  const apiVersion = API_VERSION;
  res.status(httpStatus.OK).send({ apiVersion });
});

const adminRoute = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: 'This is a sample admin route' });
});

module.exports = {
  version,
  adminRoute,
};
