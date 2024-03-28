let mongoose = require('mongoose')

let doerschema = mongoose.Schema({
    dId: Number,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phone: String,
    residenceID: String,
    type: String,
    registered: Date,
    lastLogged: Date,
    requests: {type: Number, default: 0},
    resetPassword: String
})


module.exports = mongoose.model('Doer',doerschema)
