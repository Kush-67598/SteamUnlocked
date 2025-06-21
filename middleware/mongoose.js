import mongoose from 'mongoose';

const connectDb=handler=>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect("mongodb+srv://Steam:s_unlocked1234@cluster0.ovfam.mongodb.net/")
    return handler(req,res)
}

export default connectDb

