import connectDb from "../../../middleware/mongoose";
import game from "../../../models/game";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { page = 1 } = req.query;
        const limit = 20;
        const skip = (page - 1) * limit
        let games = await game.find().skip(skip).limit(limit)
        res.status(200).json(games)
    } else {
        res.status(400).json({ message: "WRONG METHOD USED" })


    }
}

export default connectDb(handler)