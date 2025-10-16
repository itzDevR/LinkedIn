import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connectDB=async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB CONNECTED !!!")
    }catch(err){
        console.log("Db cannot connect")
    }
}
export default connectDB