const express = require('express')
const router = express.Router()
const requestcontroller = require('./../controllers/requestController.js')
const requestValidation = require('./../middleware/requestValidation.js')
const copounsController = require('./../controllers/copounsController.js')
const adminMiddleware = require('./../middleware/adminMiddleware.js')


router.route('/newrequest')
            .post(requestValidation(),requestcontroller.newrequest)

router.route('/myrequests')
            .get(requestcontroller.getcustomerrequests)

router.route('/requests')
            .get(adminMiddleware,requestcontroller.getallrequests)
            
router.route('/checkcopoun')
            .post(copounsController.getsinglescopoun)

router.route('/requests/aggregations').get(adminMiddleware,requestcontroller.requestsAggr)




module.exports = router