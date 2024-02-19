const {validationResult} = require("express-validator")
const Request = require('./../models/Request.js')
const{ httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')
const verify = require('./../middleware/verifyJWT.js')


const newrequest = async(req,res)=>{
    const token = await req.headers.authtoken

    if(token){
        try{
            let validatetoken = await verify(token,process.env.JWT)
            const data = await req.body
            const validationresult = await validationResult(req)
            let er = validationresult.array().map((e) => e.msg);
            if(er.length == 0){
                const newrequest = new Request({
                    customer: validatetoken.phone,
                    doer : data.doer,
                    for : data.for,
                    type: data.type,
                    case : data.case,
                    gender : data.gender
                })
            newrequest.save()
            httpresponse(res,200,responsemsg.SUCCESS,newrequest,null)
        }else{
            httpresponse(res,200,responsemsg.FAIL,null,er)
        }}catch(err){
            httpresponse(res,200,responsemsg.ERROR,null,"Invalid Token")
        }
    }else{
        httpresponse(res,200,responsemsg.FAIL,null,"Please Login First")

    }

}

module.exports = {
    newrequest
}