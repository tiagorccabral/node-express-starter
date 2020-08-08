const { Sequelize } = require('sequelize');
const app = require('./app');
const config = require('./config/config.js');
const logger = require('./config/logger');

// DB initialization and configs
const sequelize = new Sequelize(config.database.db_name, config.database.db_username, config.database.db_passwords, {
  host: 'localhost',
  dialect: 'postgres',
  logging: config.env === 'production' ? (msg) => logger.info(msg) : (msg) => logger.debug(msg),
});

app.listen(config.port, async () => {
  logger.info(`Listening to port ${config.port}`);
  try {
    await sequelize.authenticate();
    logger.info('DB is Up and running.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
});
