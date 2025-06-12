import connectDb from "../../middleware/mongoose";
import game from "../../models/game";

const handler=async(req,res)=>{
    if(req.method='PUT'){

        let {id,price}=req.body
        let games=await game.findById(id)

        let latest_price=games.priceHistory.length>0?games.priceHistory[games.priceHistory.length-1]:null  //access the last entry
        if(price!==latest_price){
            games.price=price
            games.priceHistory.push({
                value:price,
                date:Date.now()
            })
        }
        await games.save()
        
        res.status(200).json(games)

    }else{
        res.status(403).json("THIS METHOD CANT BE USED HERE")
    }

}

export default connectDb(handler)