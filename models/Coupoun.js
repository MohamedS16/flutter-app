let mongoose = require('mongoose')

let copounSchema = mongoose.Schema({
    copounName: String,
    copounPercent: String
})


let Copoun = mongoose.model('copoun',copounSchema)

module.exports = Copoun