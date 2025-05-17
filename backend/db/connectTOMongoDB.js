import mongoose from "mongoose";

const connecToMongoDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("connected to DB successfully");
        
    }catch(err){
        console.log(err);
        
    }
}

export default connecToMongoDb