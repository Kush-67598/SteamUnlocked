import connectDb from "../../middleware/mongoose"
import reqgames from "../../models/reqgames"

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (let i = 0; i < req.body.length; i++) {
            let data=new reqgames({
                text:req.body[i].text,
                email:req.body[i].email
            })

            await data.save()
            res.status(200).json({data})
        }
    }
    else{
        res.status(400).json({error:"Cant Use this Method"})
    }
}

export default connectDb(handler)