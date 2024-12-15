import connectDb from "../../middleware/mongoose";
import user from "../../models/user";
var CryptoJS=require("crypto-js")
var jwt = require('jsonwebtoken');
const handler=async(req,res)=>{
    if(req.method=="POST"){
        let u=await user.findOne({"email":req.body.email})
        
        if(u){
            const decryptedPass=CryptoJS.AES.decrypt(u.password,"secretkey").toString(CryptoJS.enc.Utf8)
            if(req.body.email==u.email && req.body.password==decryptedPass){
                var token=jwt.sign({email:u.email,name:u.name},'jwtsecret',{expiresIn:"2d"})
                res.status(200).json({success:true,token,email:u.email,name:u.name})
            }
            else{
                res.status(401).json("Invalid Credentials")
            }
            
        }
        if (!u) {
            return res.status(400).json({ error: "User not found" });
        }

    }
    else{
        res.status(400).json({method:"Cant use this Method"})
    }
    
}

export default connectDb(handler)