import connectDb from "../../../middleware/mongoose";
import comments from "../../../models/comments";
import User from '../../../models/user'


const handler=async(req,res)=>{
    const {slug}=req.query;
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


    if(req.method!="GET"){
        return res.status(400).json({error:"wrong method is used"})
    }
    const All_comments=await comments.find({ slug:slug }).populate("userId" ,"email name")
    console.log(All_comments)


    return res.status(200).json(All_comments)
}

export default connectDb(handler)