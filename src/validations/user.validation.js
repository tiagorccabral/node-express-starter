const Joi = require('@hapi/joi');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
};
