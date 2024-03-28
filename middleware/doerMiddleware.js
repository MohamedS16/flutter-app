let {body} = require('express-validator');
let Doer = require('./../models/Doer.js');
const User = require('../models/User.js');

module.exports = ()=>{
    return [
        body("firstName").notEmpty().withMessage('Please Enter Your First Name'),
        body("lastName").notEmpty().withMessage('Please Fill Your Last Name'),
        body("email").notEmpty().withMessage('Please Fill Your Email').isEmail().withMessage('Please Enter a valid Email').custom(async (value) => {
            let existingUser = await Doer.find({ email: value });
            if (existingUser.length != 0) {
              // Will use the below as the error message
            throw new Error("A user already exists with this Email");
            }
        }),
        body("password").notEmpty().withMessage('Please Fill Your password'),
        body("phone").notEmpty().withMessage('Please Fill Your Phone Number').isMobilePhone().withMessage("Please Enter A Valid Phone Number").custom(async (value) => {
            let existingDoer = await Doer.find({ phone: value });
            let existingUser = await User.find({phone : value});

            if (existingUser.length != 0 || existingDoer.length != 0) {
              // Will use the below as the error message
            throw new Error("A user already exists with this Phone Number");
            }
        }),
        body("residenceID").notEmpty().withMessage('Please Fill your Residence Number').custom(async (value) => {
            let existingUser = await Doer.find({ nationalID: value });
            if (existingUser.length != 0) {
              // Will use the below as the error message
            throw new Error("A user already exists with this Residence Number");
            }
        })
    ]
}