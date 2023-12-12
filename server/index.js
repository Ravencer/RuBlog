import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();
dotenv.config();

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT || 30001


app.use(cors());
app.use(express.json());


async function start(){
    try{
        await mongoose.connect(
            'mongodb://localhost:27017', 
            {
                auth:{
                    username: DB_USER,
                    password: DB_PASSWORD
                },
                name: DB_NAME

            }
            );

            app.listen(DB_PORT, () => console.log(`Server started on port: ${DB_PORT}`));
    }
    catch(error){
        console.log(error);
    }
}

start();