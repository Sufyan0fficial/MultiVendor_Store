const express = require('express')
const app = express()
const ErrorHandler = require('./Middleware/ErrorHandler')
const AuthRouter = require('./Routes/auth.routes')
const cors = require('cors')
const path = require('path')

if(process.env.NODE_ENV !== 'Production'){
    require('dotenv').config({
        path:'Backend/Config/.env'
    })
}

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())


app.use('/uploads',express.static(path.join(__dirname,'../Uploads')))
app.use('/api/v1/auth',AuthRouter)




app.use(ErrorHandler)

module.exports = app

