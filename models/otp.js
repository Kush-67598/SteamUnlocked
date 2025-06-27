import mongoose from "mongoose";

const OTPSchema=new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    createdAt:{type:Date,default:Date.now,expires:120,index:true}
}) 

mongoose.models={}
export default mongoose.model('OtpSchema',OTPSchema)