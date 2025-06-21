import connectDb from "../../middleware/mongoose";
import comments from "../../models/comments";
import user from "../../models/user";


const handler=async(req,res)=>{
    const {slug}=req.query;

    if(req.method!="GET"){
        return res.status(403).json({error:"wrong method is used"})
    }
    const All_comments=await comments.find({ slug:slug }).populate("userId" ,"email name")
    console.log(All_comments)


    return res.status(200).json(All_comments)
}

export default connectDb(handler)