import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js'
const app=express();
dotenv.config();
const PORT=process.env.PORT||3001
const USER=process.env.DB_USER
const PASS=process.env.DB_PASS
const APP=process.env.DB_APP

//MiddleWare
app.use(cors())
app.use(express.json())

//Routes
//http://localhost:3002
app.use('/api/auth',authRoute)
async function start(){
    try {
        await mongoose.connect(
            `mongodb+srv://${USER}:${PASS}@cluster0.wrifj3b.mongodb.net/${APP}?retryWrites=true&w=majority`)
        app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`))
    } catch (error) {
        console.error(error);
    }
}
start()