const express = require('express');
const checkRoute = require('./utils.route');
const usersRoutes = require('./users.route');

const router = express.Router();

router.use('/checks', checkRoute);
router.use('/users', usersRoutes);

module.exports = router;
