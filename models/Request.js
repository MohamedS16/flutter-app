const mongoose = require('mongoose')

let requestschema = mongoose.Schema({
    customer: String,
    doer : String,
    for : String,
    type: String,
    case : String,
    gender : String,
    comment: String,
    payment : {type: String, default: "none"},
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