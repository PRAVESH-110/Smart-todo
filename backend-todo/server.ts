import mongoose from "mongoose";
import app from './app'

const PORT= 5000;
const MONGO_URI = 'your_mongodb_connection_string';

const startServer= async()=>{
    try{
        await mongoose.connect(MONGO_URI);
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