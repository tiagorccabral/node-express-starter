const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefV1 = require('../../docs/swaggerDefinition');

const router = express.Router();

const options = swaggerJsdoc({
  swaggerDefinition: swaggerDefV1,
  apis: ['src/docs/*.yaml', 'src/routes/v1/*.js', 'src/routes/v1/*.yaml'],
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(options, { explorer: true }));

module.exports = router;
