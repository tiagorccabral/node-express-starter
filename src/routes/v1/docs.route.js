const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefV1 = require('../../docs/swaggerDefinition');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: swaggerDefV1,
  apis: ['src/docs/*.yaml', 'src/routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));

module.exports = router;
