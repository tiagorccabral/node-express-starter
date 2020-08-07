const app = require('./app');
const config = require('./config/config.js');
const logger = require('./config/logger');

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
