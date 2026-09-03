import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './utils/db.js'
import dotenv from 'dotenv'
import userRouter from "./routes/user.js"
import companyRouter from "./routes/company.js"
import jobRouter from "./routes/job.js"
import applicationRouter from "./routes/application.js"
dotenv.config({})

const app=express()
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin: process.env.FRONTEND_URL,
    credentials:true
}

app.use(cors(corsOption))
const PORT= 8000

app.use("/api/user",userRouter)
app.use("/api/company",companyRouter)
app.use("/api/job",jobRouter)
app.use("/api/application",applicationRouter)
app.get('/',(req,res)=>{
    res.send("api working")
})

// universal error handler
app.use((err , req, res, next)=>{
    console.log(err)
    res.status(err.status|| 500).json({
        message:err.message,
        success:false
    })
})
connectDB();
// app.listen(PORT,()=>{
//     console.log(`server listining on 8000`)
// })
export default app;
