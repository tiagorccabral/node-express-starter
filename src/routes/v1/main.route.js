const express = require('express');

const router = express.Router();
const mainController = require('../../controllers/main.controller');
const authorize = require('../../middlewares/role');

// root
router.get('/', authorize(), mainController.version);

module.exports = router;
