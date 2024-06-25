import mongoose from "mongoose"
import {DB_NAME} from  "../constant.js"

const connectDB=async()=>{
    try {
        //mongoose connect k time object deta h
        const connectInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB connected!!! DB HOST:${connectInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error ",error);
        process.exit(1);
    }
}
export default connectDB;