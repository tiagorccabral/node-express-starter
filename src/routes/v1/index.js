const express = require('express');
const checkRoute = require('./utils.route');
const usersRoutes = require('./users.route');
const docsRoutes = require('./docs.route');

const router = express.Router();

router.use('/checks', checkRoute);
router.use('/users', usersRoutes);
router.use('/api-docs', docsRoutes);

module.exports = router;
