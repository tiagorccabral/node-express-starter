const express = require('express');

const router = express.Router();
const mainController = require('../../controllers/main.controller');

// root
router.get('/', mainController.version);

module.exports = router;
