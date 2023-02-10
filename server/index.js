import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import fileUpload from "express-fileupload";
const app=express();
dotenv.config();
const PORT=process.env.PORT||3001
const USER=process.env.DB_USER
const PASS=process.env.DB_PASS
const APP=process.env.DB_APP

//MiddleWare
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
//http://localhost:3002
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
async function start(){
    try {
        await mongoose.connect(
            
            // `mongodb+srv://${USER}:${PASS}@cluster0.wrifj3b.mongodb.net/${APP}?retryWrites=true&w=majority`
            'mongodb://localhost:27017'
            )
        app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`))
    } catch (error) {
        console.error(error);
    }
}
start()