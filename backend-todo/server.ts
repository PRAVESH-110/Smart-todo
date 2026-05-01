import mongoose from "mongoose";
import app from './app'
require('dotenv').config();

const PORT= 5000;

const startServer= async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected");
        app.listen(PORT,()=>{
            console.log("Listening on port 5000")
        })
    }
    catch(err){
        console.error("couldnt connect to DB",err);
        process.exit(1);
    }

}
startServer();