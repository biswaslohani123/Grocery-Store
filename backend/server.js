import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import sellerRouter from './routes/sellerRoutes.js'

const app = express()
const PORT = process.env.PORT || 4000

await connectDB()

const allowedOrigins = ['http://localhost:5173']

//Middleware configuration
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/', (req, res) => {
    res.send("API WORKING")
}) 

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)

app.listen(PORT, () => {
    
    console.log(`Server Started at PORT ${PORT}`);
})