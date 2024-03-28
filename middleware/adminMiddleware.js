let verifyJwt = require('./verifyJWT')
let {httpresponse} = require('./../utilities/httpResponse.js')
let responsemsg = require('./../utilities/responsemsg.js')
let Admin = require('./../models/Admin.js')


let validateAdmin = async(req,res,next)=>{
    try{
        // console.log(req)
        console.log(await req.headers)
        console.log(await req.cookies)
        console.log(await req.cookies['jwt'])
        console.log(await req.cookies.jwt)
        console.log(await req.header.cookie)
        console.log(await req.cookie)
        console.log(JSON.stringify(await req.cookies))
        console.log(JSON.stringify(await req.cookie))
        let token = await req.headers.jwt
        // let token = reqToken.split('jwt=')[1]
        console.log(token)
        if(!token){
            httpresponse(res,401,responsemsg.FAIL,null,"UnAuthorized")
        }else{
            let data = await verifyJwt(token)
            console.log(data)
            let admin = await Admin.find({_id: data._id})
            console.log(admin)
            if(admin.length == 0){
                console.log(admin)
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