import mongoose from "mongoose";

const CommentSchema=new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slug:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}

})

// mongoose.models = {}

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);