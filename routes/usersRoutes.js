const express = require('express')
const router = express.Router();
const usersController = require('./../controllers/usersController.js')
const validationMiddleware = require('./../middleware/validationMiddleware.js')
router.route('/register')
            .post(validationMiddleware(),usersController.register)
router.route('/login')
            .post(usersController.login)

module.exports = router