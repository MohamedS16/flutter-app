const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/usersRoutes.js')
const uploadRoutes = require('./routes/uploadroutes.js')
const requestRoutes = require('./routes/requestsroutes.js')
const cors = require('cors')
dotenv.config()
app.listen(process.env.PORT,()=>{console.log('Server Started')})
mongoose.connect(process.env.DB).then(()=>{console.log('DB Connected')}).catch(err=>console.log(err))
app.use(cors())
app.use(express.json())

app.use('/api',userRoutes)
app.use('/api',uploadRoutes)
app.use('/api',requestRoutes)
