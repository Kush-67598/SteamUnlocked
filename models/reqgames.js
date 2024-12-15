import mongoose from "mongoose";

const reqschema=new mongoose.Schema({
    email:{type:String,required:true},
    text:{type:String,required:true}
}) 

mongoose.models={}
export default mongoose.model('ReqGamesSchema',reqschema)