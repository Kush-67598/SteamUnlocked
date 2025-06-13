import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    admin:{type:Boolean,default:false},
    wishlist:[
        {
        title:{type:String,required:true},
        slug:{type:String,required:true},
        img:{type:String},
        size:{type:String}
        }

    ]
})
mongoose.models={}
export default mongoose.model("UsersSchema", UserSchema);