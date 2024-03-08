const express = require('express')
const router = express.Router();
const adminController = require('./../controllers/adminController.js')
const copounsController = require('./../controllers/copounsController.js')

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
router.route('/addcopoun')
            .post(copounsController.addcoupoun)
router.route('/getallcopouns')
            .get(copounsController.getallcopouns)
router.route('/deletecopoun')
            .post(copounsController.deletecopoun)
router.route('/approvevideo')
            .post(adminController.approvevideo)




module.exports = router