const express = require('express')
const router = express.Router();
const usersController = require('./../controllers/usersController.js')
const validationMiddleware = require('./../middleware/validationMiddleware.js')
const uploadfunction = require('./../utilities/uploadVideo.js')
const uploadcontroller = require('./../controllers/uploadController.js')
router.route('/register')
            .post(validationMiddleware(),usersController.register)
router.route('/login')
            .post(usersController.login)

router.route('/upload')
            .post(uploadfunction().array('vid'),uploadcontroller.uploadvideo)

router.route('/videos')
            .get(uploadcontroller.getallvideos)

module.exports = router