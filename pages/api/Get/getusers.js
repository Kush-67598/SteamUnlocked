import user from "../../../models/user"
import connectDb from "../../../middleware/mongoose";

import jwt from 'jsonwebtoken'
const handler=async(req,res)=>{
    if(req.method=='POST'){
        try{
            const {token}=req.body
            const decoded=jwt.verify(token,'jwtsecret')
            const u=await user.findOne({email:decoded.email})
            if(!u) {
                return res.status(404).json({error:"NO USER FOUND"})
            }
                return res.status(200).json({success:true,admin:u.admin})
        }catch(err){
              console.error('JWT verification failed:', err.message) // <-- Add this
            return res.status(401).json({error:"TOKEN NOT VERIFED OR WRONG TOKEN"})
        
    }
    }else{
        return res.status(405).json({error:"CANT USE THIS METHOD"})
    }
}

export default connectDb(handler)