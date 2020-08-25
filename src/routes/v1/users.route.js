const express = require('express');
const userController = require('../../controllers/user.controller');

const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');

const router = express.Router();

// v1/users
router.route('/').get(userController.getAllUsers);
router.route('/').post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
