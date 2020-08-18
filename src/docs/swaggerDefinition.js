const config = require('../config/config');

const swaggerDefV1 = {
  openapi: '3.0.0',
  info: {
    title: 'Node Express Starter Project API Documentation',
    license: {
      name: 'MIT',
      url: 'https://github.com/tiagorccabral/node-express-starter',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDefV1;
