const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow('').required(),
    DB_DIALECT: Joi.string().valid('postgres', 'mysql', 'mssql', 'mariadb').required(),
    DB_TEST_NAME: Joi.string().required(),
    DB_TEST_USERNAME: Joi.string().required(),
    DB_TEST_PASSWORD: Joi.string().allow('').required(),
    DB_TEST_DIALECT: Joi.string().valid('postgres', 'mysql', 'mssql', 'mariadb').required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  secret: envVars.JWT_SECRET,
  database: {
    development: {
      db_name: envVars.DB_NAME,
      db_username: envVars.DB_USERNAME,
      db_password: envVars.DB_PASSWORD,
      db_dialect: envVars.DB_DIALECT,
    },
    test: {
      db_name: envVars.DB_TEST_NAME,
      db_username: envVars.DB_TEST_USERNAME,
      db_password: envVars.DB_TEST_PASSWORD,
      db_dialect: envVars.DB_TEST_DIALECT,
    },
  },
};
