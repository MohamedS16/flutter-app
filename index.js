const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/usersRoutes.js')
// const uploadRoutes = require('./routes/uploadroutes.js')
const requestRoutes = require('./routes/requestsroutes.js')
const cors = require('cors')
const path = require('path')
const adminRoutes = require('./routes/adminRoutes.js')
const cookieParser = require('cookie-parser')

dotenv.config()
app.listen(process.env.PORT,()=>{console.log('Server Started')})
mongoose.connect(process.env.localdb).then(()=>{console.log('DB Connected')}).catch(err=>console.log(err))
app.use(cookieParser())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", "true")
    .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    return next()


})
app.use(cors({
    origin:['http://localhost:3000','https://taffweed-dashboard.vercel.app'],
    credentials: true,
    allowedHeaders: true,

}))
app.use(express.json())
app.use('/',express.static(path.join(__dirname,'/')))

app.use('/api',userRoutes)
// app.use('/api',uploadRoutes)
app.use('/api',requestRoutes)
app.use('/admin',adminRoutes)