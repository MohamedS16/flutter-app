const mongoose = require('mongoose')

let adminSchema = mongoose.Schema({
    adminName : String,
    adminPassword: String
})

let Admin = mongoose.model('admin',adminSchema)

module.exports = Admin