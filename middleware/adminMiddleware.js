let verifyJwt = require('./verifyJWT')
let {httpresponse} = require('./../utilities/httpResponse.js')
let responsemsg = require('./../utilities/responsemsg.js')
let Admin = require('./../models/Admin.js')


let validateAdmin = async(req,res,next)=>{
    try{
        console.log(req.headers)
        let reqToken = await req.headers.jwt
        let token = reqToken.split('jwt=')[1]
        console.log(token)
        if(!token){
            httpresponse(res,401,responsemsg.FAIL,null,"UnAuthorized")
        }else{
            let data = await verifyJwt(token)
            let admin = await Admin.find({_id: data._id})
            if(admin.length == 0){
                httpresponse(res,401,responsemsg.FAIL,null,"Admin Not Found")
            }else{
                next()
            }
        }
    }catch(er){
        console.log(er)
        httpresponse(res,401,responsemsg.FAIL,null,"Invalid Token, Please Login Agin as admin")
    }
}

module.exports = validateAdmin