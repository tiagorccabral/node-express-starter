const config = require('./config');

// load the correct env configurations for DB
const dbConfig = config.database;

module.exports = {
  development: {
    database: dbConfig.development.db_name,
    username: dbConfig.development.db_username,
    password: dbConfig.development.db_password,
    dialect: dbConfig.development.db_dialect,
    host: dbConfig.development.db_host,
  },
  test: {
    database: dbConfig.test.db_name,
    username: dbConfig.test.db_username,
    password: dbConfig.test.db_password,
    dialect: dbConfig.test.db_dialect,
  },
};
