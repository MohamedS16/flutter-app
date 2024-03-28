const {validationResult} = require('express-validator');
const {httpresponse} = require('./../utilities/httpResponse.js');
const responsemsg = require('./../utilities/responsemsg.js');
const bcrypt = require('bcrypt');
const Doer = require('../models/Doer.js');

let register = async(req,res)=>{
        let newdata = await req.body;
        let validationresult = validationResult(req);
        let er = validationresult.array().map((e) => e.msg);
        if(er.length != 0){
            httpresponse(res,200,responsemsg.FAIL,null,er);
        }else{
            let lastDoerId = await Doer.find({}).sort({dId : -1}).limit(1);
            let doerId = lastDoerId[0].dId + 1 || 0

            let hashedpassword = await bcrypt.hash(newdata.password,6);
            let newdoer = await new Doer({
                dId: doerId,
                firstName: newdata.firstName,
                lastName: newdata.lastName,
                password: hashedpassword,
                email: newdata.email,
                phone: newdata.phone,
                registered: Date.now(),
                lastLogged: Date.now(),
                type:2,
                residenceID: newdata.residenceID
            })
            let saved = await newdoer.save()
            if(saved){
                httpresponse(res,200,responsemsg.SUCCESS,{msg:"Registered Successfully"},null)
            }else{
                httpresponse(res,200,responsemsg.FAIL,null,"Something Went Wrong, Please Try again")
            }
        }
}


const doerAgg = async(req,res)=>{
    try{
        let total = await Doer.estimatedDocumentCount()
        let hasRequest = await Doer.countDocuments({requests: {$gt: 0}})
        httpresponse(res,200,responsemsg.SUCCESS,{total,hasRequest},null)
    }catch(er){
        httpresponse(res,403,responsemsg.SUCCESS,null,"Something Went Wrong, Please Try Again Later")
    }
}


module.exports = { 
    register,
    doerAgg
}