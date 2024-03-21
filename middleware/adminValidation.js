const {body} = require('express-validator');
const Admin = require('./../models/Admin.js');

module.exports = ()=>{
    return [
        body("adminName").notEmpty().withMessage('Please Fill Your Admin Name').custom(async (value) => {
            let existingAdmin = await Admin.find({ adminName: value });
            if (existingAdmin.length != 0) {
            throw new Error("An admin already exists with this Name");
            }
        }),
        body("adminPassword").notEmpty().withMessage('Please Fill the Admin Password')
    ]
}