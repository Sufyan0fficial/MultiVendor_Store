const app = require('./app.js')
const DBConnection = require('./DB/connection.js')

if(process.env.NODE_ENV !== 'Production'){
    require('dotenv').config({
        path:'Config/.env'
    })
}

process.on('uncaughtException',(error)=>{
    console.log('Server is shutting down')
    console.log('err:',error.message)
})


const Start = async()=>{
    try {
        await DBConnection(process.env.DB_STR)
       server = app.listen(process.env.PORT,()=>{
            console.log(`app started at http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log('Failed to start server')
        console.log('err:',error.message)
    }
}
Start()

