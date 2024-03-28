const mongoose = require('mongoose');

const User = mongoose.Schema({
    rId: Number,
    username : String,
    password: String,
    phone: String, 
    gender: String,
    type: String,
    device: String,
    appVersion: String,
    country: String,
    registered: Date,
    lastLogged: Date,
    requests: {type: Number,default: 0},
    resetPassword: String
});

module.exports = mongoose.model('User',User);