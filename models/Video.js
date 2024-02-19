const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    videoname: String,
    requestid : String,
})


const Video = mongoose.model('video',videoSchema)

module.exports = Video