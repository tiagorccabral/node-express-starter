const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/v1');

const app = express();

// adds helmet HTTP protection
app.use(helmet());

// Sets CORS and Accepted Origins
app.use(cors());
app.options('*', cors());

// Sets backend routes
app.use('/v1', routes);

module.exports = app;
