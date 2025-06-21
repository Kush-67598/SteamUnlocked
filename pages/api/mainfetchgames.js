import connectDb from "../../middleware/mongoose";
import game from "../../models/game";

const handler=async(req,res)=>{

    if(req.method!="GET"){
        res.status(303).json({error:"WRONG METHOD USED"})
    }
    const {page=2,category}=req.query

    const limit=6
    const skip=(page-1)*limit
    const Games_cat=await game.find({category:category}).skip(skip).limit(limit)
        res.status(200).json(Games_cat)


}

export default connectDb(handler)