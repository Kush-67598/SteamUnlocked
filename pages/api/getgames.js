import connectDb from "../../middleware/mongoose";
import game from "../../models/game";

const handler=async(req,res)=>{
    if(req.method==='GET'){
        let games=await game.find()
        res.status(200).json(games)
    }
}

export default connectDb(handler)