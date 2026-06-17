import mongoose from "mongoose";

const DBconnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("database connected");
        
    } catch (err) {
        console.error("database connection error " , err);
        process.exit(1); // use to shut down the entire server
        
    }
};
export default DBconnect;