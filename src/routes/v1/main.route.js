const express = require('express');

const router = express.Router();
const mainController = require('../../controllers/main.controller');
const authorizeRoles = require('../../middlewares/role');

// root
router.get('/', mainController.version);
router.get('/admin', authorizeRoles('admin'), mainController.adminRoute);

module.exports = router;
