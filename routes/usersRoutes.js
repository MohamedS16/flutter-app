const express = require('express')
const router = express.Router();
const usersController = require('./../controllers/usersController.js')
const validationMiddleware = require('./../middleware/validationMiddleware.js')
const uploadfunction = require('./../utilities/uploadVideo.js')
const uploadcontroller = require('./../controllers/uploadController.js');
const sendmsg = require('../utilities/sendmessage.js');
router.route('/register')
            .post(validationMiddleware(),usersController.register)
router.route('/login')
            .post(usersController.login)
router.route('/updateprofile')
            .post(usersController.updateprofile)

router.route('/upload')
            .post(uploadfunction().single('vid'),uploadcontroller.uploadvideo)

router.route('/videos')
            .get(uploadcontroller.getallvideos)


// router.route('/sendmsg')
//             .get(function(req,res){
//                 sendmsg()
//                 res.json({
//                     msg : "Done"
//                 })
//             })

module.exports = router