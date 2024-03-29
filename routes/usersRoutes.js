const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersController.js");
const uploadfunction = require("./../utilities/uploadVideo.js");
// const uploadcontroller = require("./../controllers/uploadController.js");
const sendmsg = require("../utilities/sendmessage.js");
const registerMiddleware = require("./../middleware/registerMiddleware.js");
const customerController = require("./../controllers/customerController.js");
const doerController = require("./../controllers/doersController.js");
const doerMiddleware = require("./../middleware/doerMiddleware.js");


const adminMiddleware = require('./../middleware/adminMiddleware.js')

router.route("/login").post(usersController.login);
router.route("/updateprofile").post(usersController.updateprofile);
router.route("/deleteaccount").get(usersController.deleteaccount);
router.route("/resetpassword").post(usersController.resetpassword);
router.route('/lastlogged').get(usersController.lastLogged);

router.route("/customer/register").post(registerMiddleware(), customerController.register);
router.route("/customer/aggregations").get(adminMiddleware,customerController.customerAgg);

router.route("/doer/register").post(adminMiddleware,doerMiddleware(), doerController.register);
router.route("/doer/aggregations").get(adminMiddleware,doerController.doerAgg)

// router
//   .route("/upload")
//   .post(uploadfunction().single("vid"), uploadcontroller.uploadvideo);

// router.route("/videos").get(uploadcontroller.getallvideos);

// router.route('/test')
//     .get(adminMiddleware,function(req,res){
//       res.json('wslt')
//       res.end()
//     })

// router.route('/sendmsg')
//             .get(function(req,res){ 
//                 sendmsg()
//                 res.json({
//                     msg : "Done"
//                 })
//             })

module.exports = router;