/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable security/detect-non-literal-require */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const basename = path.basename(__filename);
const config = require('../../config/config');
const logger = require('../../config/logger');

// load the correct env configurations for DB
const dbConfig = config.database[config.env];

const db = {};

// DB initialization and configs
const sequelize = new Sequelize(dbConfig.db_name, dbConfig.db_username, dbConfig.db_password, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: config.env === 'production' ? (msg) => logger.info(msg) : (msg) => logger.debug(msg),
});

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
