const bcrypt = require('bcrypt')
module.exports = async (pass,encrypted)=>{
    let val = await bcrypt.compare(pass,encrypted)
    return val
} 