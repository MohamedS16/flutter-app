const jwt = require('jsonwebtoken')

const verify = async (token)=>{
    return jwt.verify(token,process.env.JWT,(er,decoded)=>{
        if(er){
            throw new Error("Invalid Tokennnn")
        }else{
            return (decoded)
        }
    })
}


module.exports = verify