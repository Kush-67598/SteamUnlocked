import mongoose from 'mongoose';

const connectDb=handler=>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect("mongodb+srv://Steam:s_unlocked1234@cluster0.ovfam.mongodb.net/")
    return handler(req,res)
}

export default connectDb

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("Connection error:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
