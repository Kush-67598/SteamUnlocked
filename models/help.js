import mongoose from "mongoose";

const HelpSchema= new mongoose.Schema({
    value:{type:String,required:true}
}, { timestamps: true })
mongoose.models = {}

export default mongoose.model("HelpSchema", HelpSchema)
