const express = require('express')
const app = express()
const ErrorHandler = require('./Middleware/ErrorHandler')
const AuthRouter = require('./Routes/auth.routes')
const SellerAuthRouter = require('./Routes/sellerAuth.routes')
const ProductRouter = require('./Routes/Product.routes')
const EventRouter = require('./Routes/event.routes.js')
const CouponRouter = require('./Routes/coupon.routes.js')
const UserRouter = require('./Routes/user.routes.js')
const PaymentRouter = require('./Routes/payment.routes.js')
const OrderRouter = require('./Routes/order.routes.js')
const ReviewRouter = require('./Routes/review.routes.js')
const ChatRouter = require('./Routes/chat.routes.js')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')



if(process.env.NODE_ENV !== 'Production'){
    require('dotenv').config({
        path:'Backend/Config/.env'
    })
}

app.use(cookieParser())

app.use(cors({
    origin:
    ['http://localhost:5175','http://localhost:5173','http://192.168.1.8:5173','http://192.168.1.4:5173','http://192.168.100.5:5173','http://192.168.1.11:5173','http://192.168.1.23:5173']
    
    ,
    credentials:true
}))
app.use(express.json())


app.use('/uploads',express.static(path.join(__dirname,'../Uploads')))
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/seller/auth',SellerAuthRouter)
app.use('/api/v1/seller/product',ProductRouter)
app.use('/api/v1/seller/event',EventRouter)
app.use('/api/v1/seller/coupon',CouponRouter)
app.use('/api/v1/user',UserRouter)
app.use('/api/v1/payment',PaymentRouter)
app.use('/api/v1/order',OrderRouter)
app.use('/api/v1/review',ReviewRouter)
app.use('/api/v1/chat',ChatRouter)





app.use(ErrorHandler)

module.exports = app

