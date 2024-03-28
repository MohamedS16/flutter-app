const User = require("./../models/User.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { httpresponse } = require("./../utilities/httpResponse.js");
const responsemsg = require("./../utilities/responsemsg.js");
const createJWT = require("./../utilities/createJWT.js");


const register = async (req, res) => {
    let data = await req.body;
    let errors = await validationResult(req);
    let er = errors.array().map((e) => e.msg);
  
    if (er.length != 0) {
        httpresponse(res, 200, responsemsg.FAIL, null, er);
    } else {
    let lastCustomerId = await User.find({}).sort({rId : -1}).limit(1);
    let customerId = lastCustomerId[0].rId + 1 || 0
    let hashedpass = await bcrypt.hash(data.password, 6);
    let newuser = await new User({
        rId : customerId,
        username: data.username,
        password: hashedpass,
        phone: data.phone,
        gender: data.gender,
        device: data.device,
        appVersion: data.appVersion,
        country: data.country,
        registered: Date.now(),
        lastLogged: Date.now(),
        type: 1
    });
    let saved = newuser.save();

    if(saved){
        let token = createJWT({
            username: data.username,
            phone: data.phone,
            type: 1,
        })
        httpresponse(res,200,responsemsg.SUCCESS,{msg:"Successfully Registered",token},null);
    }else{
        httpresponse(res,200,responsemsg.FAIL,null,"Something Went Wrong, Please Try Again");
    }
    }
  };


const customerAgg = async(req,res)=>{
    try{
        let total = await User.estimatedDocumentCount()
        let hasRequest = await User.countDocuments({requests: {$gt: 0}})
        httpresponse(res,200,responsemsg.SUCCESS,{total,hasRequest},null)
    }catch(er){
        httpresponse(res,403,responsemsg.SUCCESS,null,"Something Went Wrong, Please Try Again Later")
    }
}


  module.exports = {
    register,
    customerAgg
  }