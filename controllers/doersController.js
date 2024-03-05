const {validationResult} = require('express-validator');
const {httpresponse} = require('./../utilities/httpResponse.js');
const responsemsg = require('./../utilities/responsemsg.js');
const bcrypt = require('bcrypt');
const Doer = require('../models/Doer.js');
const createJWT = require('./../utilities/createJWT.js')

let register = async(req,res)=>{
        let newdata = await req.body;
        let validationresult = validationResult(req);
        let er = validationresult.array().map((e) => e.msg);
        if(er.length != 0){
            httpresponse(res,200,responsemsg.FAIL,null,er);
        }else{
            let hashedpassword = await bcrypt.hash(newdata.password,6);
            let newdoer = await new Doer({
                firstName: newdata.firstName,
                lastName: newdata.lastName,
                password: hashedpassword,
                email: newdata.email,
                phone: newdata.phone,
                type:2,
                residenceID: newdata.residenceID
            })
            let saved = await newdoer.save()
            if(saved){
                let token = createJWT({
                    name: newdata.firstName + ' ' + newdata.lastName,
                    phone: newdata.phone,
                    type: 2
                })
                httpresponse(res,200,responsemsg.SUCCESS,{msg:"Registered Successfully",token},null)
            }else{
                httpresponse(res,200,responsemsg.FAIL,null,"Something Went Wrong, Please Try again")
            }
        }
}


module.exports = {
    register
}