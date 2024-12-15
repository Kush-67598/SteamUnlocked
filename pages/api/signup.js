import user from "../../models/user";
import connectDb from "../../middleware/mongoose"
var CryptoJS=require("crypto-js")

const handler=async(req,res)=>{
    if(req.method=="POST"){
        const {name,email}=req.body
    
            let u=new user({name,email,password:CryptoJS.AES.encrypt(req.body.password,'secretkey').toString()})
            await u.save()
            res.status(200).json({u,success:true})
    }
    else{
        res.status(400).json({Error:'Wrong method used'})
    }
}

export default connectDb(handler)