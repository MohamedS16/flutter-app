const express = require('express')
const router = express.Router();
const customerController = require('./../controllers/customerController.js');
const doerController = require('./../controllers/doersController.js');
const requestcontroller = require('./../controllers/requestController.js')
const adminController = require('./../controllers/adminController.js')


router.route('/doer/getall')
            .get(adminController.getalldoers)
router.route('/customer/getall')
            .get(adminController.getallcustomers)
router.route('/getallrequests')
            .get(adminController.getallrequests)
router.route('/getsinglerequest/:doerid')
            .get(adminController.getsinglerequest)
router.route('/getcustomerrequests/:phone')
            .get(adminController.getcustomerequests)
router.route('/getdoerrequests/:phone')
            .get(adminController.getdoersrequests)



module.exports = router