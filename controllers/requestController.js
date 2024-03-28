const {validationResult} = require("express-validator")
const Request = require('./../models/Request.js')
const User = require('./../models/User')
const{ httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')
const verify = require('./../middleware/verifyJWT.js')


const newrequest = async(req,res)=>{
    const token = await req.headers.authtoken

    if(token){
        try{
            let validatetoken = await verify(token,process.env.JWT)
            if(validatetoken.type == 1){
                const data = await req.body
                const validationresult = await validationResult(req)
                let er = validationresult.array().map((e) => e.msg);
                if(er.length == 0){
                    let lastRequestId = await Request.find({}).sort({rId : -1}).limit(1);
                    let reqId = lastRequestId[0].rId + 1 || 0
                    const newrequest = new Request({
                        rId : reqId,
                        customer: validatetoken.phone,
                        for : data.for,
                        type: data.type,
                        case : data.case,
                        gender : data.gender,
                        comment: data.comment,
                        payment : data.payment,
                        date : Date.now()
                    })
                newrequest.save()
                let updateuser = await User.updateOne({phone:validatetoken.phone},{$inc:{'requests': 1}})
                console.log(updateuser)
                httpresponse(res,200,responsemsg.SUCCESS,newrequest,null)
            }else{
                httpresponse(res,200,responsemsg.FAIL,null,er)
            }
            }else{
                httpresponse(res,200,responsemsg.FAIL,null,"You Are Not Allowed To Add A Request, Please Login as a customer")
            }
        }catch(err){
            httpresponse(res,200,responsemsg.ERROR,null,"Invalid Token")
        }
    }else{
        httpresponse(res,200,responsemsg.FAIL,null,"Please Login First")

    }

}

const getcustomerrequests = async(req,res)=>{
    const token = await req.headers.authtoken

    if(token){
        try{
            let validatetoken = await verify(token,process.env.JWT)
            if(validatetoken.type == 1){
                let customerRequests = await Request.find({customer: validatetoken.phone})
                httpresponse(res,200,responsemsg.SUCCESS,customerRequests,null)
            }else{
                let customerRequests = await Request.find({doer: validatetoken.phone})
                httpresponse(res,200,responsemsg.SUCCESS,customerRequests,null)
            }
        }catch(err){
            httpresponse(res,200,responsemsg.ERROR,null,"Invalid Token")
        }
    }else{
        httpresponse(res,200,responsemsg.FAIL,null,"Please Login First")

    }
}

const getallrequests = async (req, res) => {
    
    let requests = await Request.find({});
    httpresponse(res, 200, responsemsg.SUCCESS, requests, null);
};



const requestsAggr = async(req,res)=>{
    try{
        let total = await Request.estimatedDocumentCount()
        let donee = await Request.countDocuments({isDone:true})
        httpresponse(res,200,responsemsg.SUCCESS,{total,donee},null)
    }catch(er){
        httpresponse(res,403,responsemsg.SUCCESS,null,"Something Went Wrong, Please Try Again Later")
    }
}


module.exports = {
    newrequest,
    getcustomerrequests,
    getallrequests,
    requestsAggr
}