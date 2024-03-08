let mongoose = require('mongoose')

let doerschema = mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phone: String,
    residenceID: String,
    type: String,
    resetPassword: String
})

let Doer  = mongoose.model('Doer',doerschema)

module.exports = Doer