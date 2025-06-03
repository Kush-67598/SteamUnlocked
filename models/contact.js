import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    value:{type:String,required:true}
}, { timestamps: true })
mongoose.models = {}

export default mongoose.model("ContactSchema", contactSchema)
