const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes/v1');

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

// Sets backend routes
app.use('/v1', routes);

module.exports = app;
