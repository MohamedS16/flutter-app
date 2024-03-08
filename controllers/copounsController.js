const Copoun = require("../models/Coupoun")
const {httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')

let addcoupoun = async(req,res)=>{
    let coupoun = await req.body
    let getcopoun = await Copoun.find({copounName:coupoun.name})
    if(getcopoun[0]){
        httpresponse(res,200,responsemsg.FAIL,null,"Copoun Already Exists");
    }else{
        let sedncopoun = await new Copoun({
            copounName: coupoun.name,
            copounPercent : coupoun.percent
        })
        let done = sedncopoun.save()
        if(!done){
            httpresponse(res,200,responsemsg.FAIL,null,"Something Went Wrong Please Try Again");
        }else{
            httpresponse(res,200,responsemsg.SUCCESS,{msg:"Copoun Added Successfully"},null);
        }
    }
}

let getallcopouns = async(req,res)=>{
    try{
        let data = await Copoun.find({})
        httpresponse(res,200,responsemsg.SUCCESS,{copouns:data},null)
    }catch(er){
        httpresponse(res,200,responsemsg.FAIL,null,er)
    }
}

let deletecopoun = async(req,res)=>{
    let copoun = await req.body
    let del = await Copoun.deleteOne({copounName:copoun.name})
    if(del?.deletedCount != 1){
        httpresponse(res,200,responsemsg.FAIL,null,"Copoun Not Deleted")
    }else{
        httpresponse(res,200,responsemsg.SUCCESS,{msg:"Copoun Deleted Successfully"},null)
    }
}

let getsinglescopoun =  async(req,res)=>{
    let copoun = await req.body.copounName
    if(!copoun){
        httpresponse(res,200,responsemsg.FAIL,null,"Please Enter A Copoun Name")
    }else{
        let findcopoun = await Copoun.find({copounName: copoun})
        if(!findcopoun[0]){
            httpresponse(res,200,responsemsg.FAIL,null,"Copoun Not Found")
        }else{
            httpresponse(res,200,responsemsg.SUCCESS,findcopoun[0],null)
        }
    }
}

module.exports = {
    addcoupoun,
    getallcopouns,
    deletecopoun,
    getsinglescopoun
}