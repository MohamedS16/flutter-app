const {httpresponse} = require('./../utilities/httpResponse.js');
const responsemsg = require('./../utilities/responsemsg.js');
const Doer = require('../models/Doer.js');
const Request = require('./../models/Request.js')
const User = require("./../models/User.js");


const getalldoers = async(req,res)=>{
    let doers = await Doer.find()
    httpresponse(res,200,responsemsg.SUCCESS,doers,null)
}

const getallrequests = async(req,res)=>{
    let requests = await Request.find({})
    httpresponse(res,200,responsemsg.SUCCESS,requests,null)
}

const getallcustomers = async(req,res)=>{
    let customers = await User.find()
    httpresponse(res,200,responsemsg.SUCCESS,customers,null)
}

const getdoersrequests = async(req,res)=>{
    let doerid = await req.params.phone;
    let doerrequest = await Request.find({doer:doerid});
    httpresponse(res,200,responsemsg.SUCCESS,doerrequest,null)
}

const getcustomerequests = async(req,res)=>{
    let customerid = await req.params.phone;
    let customerrequest = await Request.find({customer:customerid});
    httpresponse(res,200,responsemsg.SUCCESS,customerrequest,null)
}

const getsinglerequest = async(req,res)=>{
    let requestid = await req.params.doerid
    let request = await Request.find({_id:requestid})
    httpresponse(res,200,responsemsg.SUCCESS,request,null)
}



module.exports = {
    getallcustomers,
    getalldoers,
    getallrequests,
    getdoersrequests,
    getcustomerequests,
    getsinglerequest
}