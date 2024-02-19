const Video = require('./../models/Video.js')
const verify = require('./../middleware/verifyJWT.js')

const uploadvideo = async (req,res)=>{
    const token = await req.headers.authtoken
    if(token){
        try{
            let data = await verify(token,process.env.JWT)
            const videoreq = await req.files
            let reqno = await req.body
            const resp = []
            videoreq.forEach(element => {
                const video = new Video({
                    videoname : element.path,
                    requestid : reqno.requestid
                }) 
                video.save()
                resp.push(`Video ${element.originalname} Uploaded Successfully`)
            });
            let msg = 'Thank You ' + data.username
            res.json({
                namee: resp,
                msg
            })
                }catch(er){
                    res.json({msg: "Invalid Token, Please Login Again"})
                }
            }else{
                res.json({msg:"Please Login First"})
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