import { log } from "console";
import mongoose from "mongoose";
export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("mongoDB connected succesfully");
            
        })
        connection.on("error",(err)=>{
            console.log(err);
            process.exit();
            
        })
        
    } catch (error) {
        console.log("something went worng");
        console.log(error);
                
    }
}