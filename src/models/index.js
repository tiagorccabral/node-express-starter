const { Sequelize } = require('sequelize');
const config = require('../config/config');
const logger = require('../config/logger');

// load the correct env configurations for DB
const dbConfig = config.database[config.env];

const db = {};

// DB initialization and configs
const sequelize = new Sequelize(dbConfig.db_name, dbConfig.db_username, dbConfig.db_passwords, {
  host: 'localhost',
  dialect: 'postgres',
  logging: config.env === 'production' ? (msg) => logger.info(msg) : (msg) => logger.debug(msg),
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
