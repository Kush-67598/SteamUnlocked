import mongoose from 'mongoose';

const connectDb=handler=>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect('mongodb+srv://kushsingh2666:74U4JlWzeQnlBjTm@cluster0.ovfam.mongodb.net/')
    return handler(req,res)
}

export default connectDb