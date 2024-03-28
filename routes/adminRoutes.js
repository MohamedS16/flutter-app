const express = require('express')
const router = express.Router();
const adminController = require('./../controllers/adminController.js')
const copounsController = require('./../controllers/copounsController.js')
const adminValidation = require('./../middleware/adminValidation.js')
const adminMiddleware = require('./../middleware/adminMiddleware.js')

router.route('/doer/getall')
            .get(adminMiddleware,adminController.getalldoers)
router.route('/customer/getall')
            .get(adminMiddleware,adminController.getallcustomers)

router.route('/getsinglerequest/:doerid')
            .get(adminMiddleware,adminController.getsinglerequest)
router.route('/getcustomerrequests/:phone')
            .get(adminMiddleware,adminController.getcustomerequests)
router.route('/getdoerrequests/:phone')
            .get(adminMiddleware,adminController.getdoersrequests)
router.route('/addcopoun')
            .post(adminMiddleware,copounsController.addcoupoun)
router.route('/getallcopouns')
            .get(adminMiddleware,copounsController.getallcopouns)
router.route('/deletecopoun')
            .post(adminMiddleware,copounsController.deletecopoun)
router.route('/approvevideo')
            .post(adminMiddleware,adminController.approvevideo)

router.route('/adminRegister')
            .post(adminMiddleware,adminController.adminRegister)
router.route('/adminlogin')
            .post(adminController.adminLogin)
router.route('/getadmin') 
            .get(adminMiddleware,adminController.getAdmin)
router.route('/logout')
            .get(adminMiddleware,adminController.adminLogout)

router.route('/assignrequest')
            .post(adminMiddleware,adminController.assignRequest)



            router.route('/allaggregations').get(adminController.allAggregations)
module.exports = router