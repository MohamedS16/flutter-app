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


let approvevideo = async(req,res)=>{
    let videodata = await req.body
    if(!videodata.requestID || !videodata.step || !videodata.action){
        httpresponse(res,200,responsemsg.FAIL,null,"Please Choose A Video To Approve or Reject")
    }else{
        let stepp = `videos.${videodata.step}.approved`
        let updatevideo
        if(videodata.step == 'one'){
            updatevideo = await Request.updateOne({_id:videodata.requestID},{
                "videos.one.approved" : videodata.action
            })
        }else if(videodata.step == 'two'){
            updatevideo = await Request.updateOne({_id:videodata.requestID},{
                "videos.two.approved" : videodata.action
            })
        }else if(videodata.step == 'three'){
            updatevideo = await Request.updateOne({_id:videodata.requestID},{
                "videos.three.approved" : videodata.action
            })
        }else if(videodata.step == 'four'){
            updatevideo = await Request.updateOne({_id:videodata.requestID},{
                "videos.four.approved" : videodata.action
            })
        }else{
            httpresponse(res,200,responsemsg.FAIL,null,"Please Enter a valid Step")
        }

        if(updatevideo?.modifiedCount == 0){
            httpresponse(res,200,responsemsg.FAIL,null,"Nothing Updated Please Try Again")
        }else{
            httpresponse(res,200,responsemsg.SUCCESS,{msg:"Updated Successfully",updatevideo},null)
        }
    }
}



module.exports = {
    getallcustomers,
    getalldoers,
    getallrequests,
    getdoersrequests,
    getcustomerequests,
    getsinglerequest,
    approvevideo
}