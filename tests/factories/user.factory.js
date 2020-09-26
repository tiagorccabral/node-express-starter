const { User } = require('../../src/db/models');
const { dummyUser } = require('../dummies/user');
const { factory } = require('./index');

factory.define('user', User, dummyUser);

const createUser = async () => {
  const user = await factory.build('user');
  await user.save();
  return user;
};

module.exports = { createUser };
