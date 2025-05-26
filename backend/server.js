import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/db.js'
import 'dotenv/config'

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

app.listen(PORT, () => {
    
    console.log(`Server Started at PORT ${PORT}`);
})