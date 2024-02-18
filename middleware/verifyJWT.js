const jwt = require('jsonwebtoken')

const verify = async (token,salt)=>{
    return jwt.verify(token,salt,(er,decoded)=>{
        if(er){
            throw new Error("Invalid Tokennnn")
        }else{
            return (decoded)
        }
    })
}


module.exports = verify