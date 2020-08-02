const express = require('express');
const checkRoute = require('./utils.route');

const router = express.Router();

router.use('/checks', checkRoute);

module.exports = router;
