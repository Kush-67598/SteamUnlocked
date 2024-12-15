import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    size: { type: String, required: true },
    category:{type:String,required:true},
    desc: { type: String, required: true },
    OS: { type: String, required: true },
    Processor: { type: String, required: true },
    Memory: { type: String, required: true },
    Graphics: { type: String, required: true },
    Storage: { type: String, required: true },
    ss1: { type: String },
    ss2: { type: String },
    ss3: { type: String }
}, { timestamps: true })
mongoose.models = {}

export default mongoose.model("GameSchema", GameSchema)
