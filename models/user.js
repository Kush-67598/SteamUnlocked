import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    admin:{type:Boolean,default:false}
})
mongoose.models={}
export default mongoose.model("UsersSchema", UserSchema);