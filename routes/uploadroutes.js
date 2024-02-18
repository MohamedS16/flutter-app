const express = require('express')
const router = express.Router();
const uploadfunction = require('./../utilities/uploadVideo.js')
const uploadcontroller = require('./../controllers/uploadController.js');

router.route('/upload')
            .post(uploadfunction().array('vid'),uploadcontroller.uploadvideo)

router.route('/videos')
            .get(uploadcontroller.getallvideos)

module.exports = router