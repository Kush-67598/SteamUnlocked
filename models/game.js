import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String,required:true },
  img: { type: String,required:true },
  size: { type: String,required:true },
  category: { type: String,required:true },
  desc: { type: String, },
  os: { type: String, },
  processor: { type: String, },
  memory: { type: String, },
  graphics: { type: String, },
  storage: { type: String, },
  ss1: { type: String },
  ss2: { type: String },
  ss3: { type: String },
  price: { type: Number,required:true },
  priceHistory: [
    {
      value: { type: Number },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

mongoose.models = {}

export default mongoose.model("GameSchema", GameSchema)
