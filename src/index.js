const app = require('./app');
const config = require('./config/config.js');
const logger = require('./config/logger');
const db = require('./models');

let server = null;
server = app.listen(config.port, async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('DB is Up and running!');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
