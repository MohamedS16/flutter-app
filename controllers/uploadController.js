const Video = require('./../models/Video.js')


const uploadvideo = async (req,res)=>{
    const swr = await req.files
    const resp = []
    swr.forEach(element => {
       if(element.mimetype.split('/')[0] == 'video'){
        const sora = new Video({
            videoname : element.path
           }) 
           sora.save()
           resp.push(`Video ${element.originalname} Uploaded Successfully`)
       }else{
        resp.push(`File ${element.originalname} Not Uploaded as it is Not a file`)
       }
    });

    res.json({
        namee: resp
    })
}


const getallvideos = async (req,res)=>{
    const videos = await Video.find().select('videoname')
    res.json({
        videos 
    })
}

module.exports = {
    uploadvideo,
    getallvideos
}