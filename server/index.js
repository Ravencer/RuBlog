import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'

const app = express();
dotenv.config();

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT || 30001


app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter);


async function start(){
    try{
        await mongoose.connect(
            `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/${DB_NAME}`
            );

            app.listen(DB_PORT, () => console.log(`Server started on port: ${DB_PORT}`));
    }
    catch(error){
        console.log(error);
    }
}

start();