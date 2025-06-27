import reqgames from "../../../models/reqgames";
import connectDb from "../../../middleware/mongoose";

const handler=async(req,res)=>{
if(req.method=='GET'){

    let getreqgames=await reqgames.find()
    res.status(200).json({getreqgames})
}
}

export default connectDb(handler)