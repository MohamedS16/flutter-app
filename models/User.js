const mongoose = require('mongoose');

const User = mongoose.Schema({
    username : {type: String, required: [true,'Username is Required']},
    password: {type: String, required: [true,'Password is Required']},
    phone: {type: String, required: true,unique: [true,'Phone is Required']},
    gender: {type: String, required: [true,'Gender is Required'], enum: {values:['Male','Female'],message:'Gender Must Be Male or Female'}},
    type: {type: String, required: [true,'Email is Required'], enum: ['1','2']},
    resetPassword: String
});

module.exports = mongoose.model('User',User);