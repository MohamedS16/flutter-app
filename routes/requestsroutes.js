const express = require('express')
const router = express.Router()
const requestcontroller = require('./../controllers/requestController.js')
const requestValidation = require('./../middleware/requestValidation.js')

router.route('/newrequest')
            .post(requestValidation(),requestcontroller.newrequest)

router.route('/myrequests')
            .get(requestcontroller.getcustomerrequests)


module.exports = router