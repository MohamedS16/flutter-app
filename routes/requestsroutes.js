const express = require('express')
const router = express.Router()
const requestcontroller = require('./../controllers/requestController.js')
const requestValidation = require('./../middleware/requestValidation.js')
const copounsController = require('./../controllers/copounsController.js')

router.route('/newrequest')
            .post(requestValidation(),requestcontroller.newrequest)

router.route('/myrequests')
            .get(requestcontroller.getcustomerrequests)

router.route('/checkcopoun')
            .post(copounsController.getsinglescopoun)




module.exports = router