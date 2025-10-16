import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const PORT=process.env.PORT
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use('/api/auth',userRouter)

app.listen(PORT,()=>{
    console.log(`${PORT} is listening`)
    connectDB()
})
