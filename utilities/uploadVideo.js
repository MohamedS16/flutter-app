const multer = require('multer')

const uploadfunction = () => {
    const diskstorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,'uploads/videos')
            cb(null, './')
        },
        filename: async (req, file, cb) => {
            const vname = await Date.now() + '-' + Math.round(Math.random() * 100000);
            cb(null,vname + '.' + file.mimetype.split('/')[1])
        },
    })

    const upload = multer({
        storage: diskstorage
    })
    return upload
}

module.exports = uploadfunction 
