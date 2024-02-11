const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    videoname: String
})


const Video = mongoose.model('video',videoSchema)

module.exports = Video