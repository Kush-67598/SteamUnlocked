import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if(req.method!=="GET")return res.status(403).json("WRONG METHOD USED")
    let authHeaders=req.headers.authorization
    let token=authHeaders.split(" ")[1]
    if(!token){
      return res.status(401).json({error:"HEADER TOKEN NOT FOUND"})
    }
    let decoded=jwt.verify(token,'jwtsecret')
    let u=await User.findOne({email:decoded.email})
    if(!u){
          return res.status(401).json({error:"USER NOT FOUND"})
    }
    return res.status(200).json({wishlist:u.wishlist})

  
};

export default connectDb(handler);
