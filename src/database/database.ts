import mongoose from "mongoose";

const conn=process.env.MONGODB_URI
async function connectToDatabase(){
    if (!conn) {
        throw new Error("MongoDB URI is undefined");
      }
    await mongoose.connect(conn)
    console.log("Database connection successfull")
 }


export default connectToDatabase