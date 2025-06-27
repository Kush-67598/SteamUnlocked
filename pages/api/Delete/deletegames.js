import connectDb from "../../../middleware/mongoose";
import game from "../../../models/game";

const handler=async(req,res)=>{
    try{

        if(req.method=="DELETE"){
            let {id}=req.body
            let games =await game.findByIdAndDelete(id)
            res.status(200).json({success:"GAME SUCCESSFULLY DELETED",games})
        }
        else{
            res.status(404).json({error:"Cant use this method"})
        }
    }catch(err){
        res.status(500).json({error:"Internal Server Error"})
    }
      

}

export default connectDb(handler)