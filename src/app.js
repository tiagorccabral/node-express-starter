const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const { jwtStrategy } = require('./config/passport');
const { API_VERSION } = require('./utils/constants');
const routes = require('./routes/v1');
const mainRoutes = require('./routes/v1/main.route');

const app = express();

// adds helmet HTTP protection
app.use(helmet());

// Sets CORS and Accepted Origins
app.use(cors());
app.options('*', cors());

// Populate req data into JSON
app.use(bodyParser.json());

// Initialize JWT options and strategy using Passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Set root path
app.use('/', mainRoutes);

// Sets backend routes
app.use(`/${API_VERSION}`, routes);

module.exports = app;
