const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

// v1/users
router.route('/').get(userController.getAllUsers);
router.route('/').post(userController.createUser);

module.exports = router;
