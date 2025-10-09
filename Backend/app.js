const express = require('express')
const app = express()
const ErrorHandler = require('./Middleware/ErrorHandler')

if(process.env.NODE_ENV !== 'Production'){
    require('dotenv').config({
        path:'Backend/Config/.env'
    })
}

app.use(express.json())



app.use(ErrorHandler)

module.exports = app

