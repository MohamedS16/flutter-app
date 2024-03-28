const mongoose = require('mongoose')

let requestschema = mongoose.Schema({
    rId:Number,
    customer: String,
    doer : {type: String, default: "none"},
    for : String,
    type: String,
    case : String,
    gender : String,
    comment: String,
    date: Date,
    payment : {type: String, default: "none"},
    isDone: {type: Boolean, default : false},
    videos: {
        one : {
            link : {type: String, default: "none"},
            approved : {type: String, default: "no"}
        },
        two : {
            link : {type: String, default: "none"},
            approved : {type: String, default: "no"}
        },
        three : {
            link : {type: String, default: "none"},
            approved : {type: String, default: "no"}
        },
        four : {
            link : {type: String, default: "none"},
            approved : {type: String, default: "no"}
        }
    }
})

const requestmodel = mongoose.model('Request',requestschema);

module.exports = requestmodel