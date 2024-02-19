const {validationResult} = require("express-validator")
const Request = require('./../models/Request.js')
const{ httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')

const newrequest = async(req,res)=>{
    const data = await req.body
    const validationresult = await validationResult(req)
    let er = validationresult.array().map((e) => e.msg);
    if(er.length == 0){
        const newrequest = new Request({
            customer: data.customer,
            doer : data.doer,
            for : data.for,
            type: data.type,
            case : data.case,
            gender : data.gender
        })
        newrequest.save()
        httpresponse(res,200,responsemsg.SUCCESS,newrequest,null)
    }else{
        httpresponse(res,200,responsemsg.SUCCESS,null,er)

    }
}

module.exports = {
    newrequest
}