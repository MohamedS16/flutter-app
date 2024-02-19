const Video = require('./../models/Video.js')
const verify = require('./../middleware/verifyJWT.js')
const Requestt = require('./../models/Request.js')
const{ httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')

const uploadvideo = async (req,res)=>{
    const token = await req.headers.authtoken
    if(token){
        try{
            let data = await verify(token,process.env.JWT)
            const videoreq = await req.file
            let reqno = await req.body
            if(reqno.step == 1){
                let ok = await Requestt.updateOne({_id:reqno.id},{
                    'videos.one.link' : videoreq.path
                })
            }else if(reqno.step == 2){
                let ok = await Requestt.updateOne({_id:reqno.id},{
                    'videos.two.link' : videoreq.path
                })
            }else if(reqno.step == 3){
                let ok = await Requestt.updateOne({_id:reqno.id},{
                    'videos.three.link' : videoreq.path
                })
            }else if(reqno.step == 4){
                let ok = await Requestt.updateOne({_id:reqno.id},{
                    'videos.four.link' : videoreq.path
                })
            }
            httpresponse(res,200,responsemsg.SUCCESS,"Successfully Uploaded",null)
        }catch(er){
                httpresponse(res,200,responsemsg.FAIL,null,"Invalid Token, Please Login Again")
        }
            }else{
                httpresponse(res,200,responsemsg.FAIL,null,"Please Login First")
            }
}

const getallvideos = async (req,res)=>{
    const token = await req.headers.authtoken
    try{
        let data = await verify(token,process.env.JWT)
        const videos = await Video.find().select('videoname')
        console.log(data)
        res.json({
            videos
        })
    }catch(er){
        res.json({msg: "Invalid Token"})
    }
}

module.exports = {
    uploadvideo,
    getallvideos
}