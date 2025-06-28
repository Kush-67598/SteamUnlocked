import connectDb from "../../../middleware/mongoose"
import reqgames from "../../../models/reqgames"
const handler = async (req, res) => {
    if (req.method == "POST") {
        const { text, email } = req.body
        let data = new reqgames({
            text, email, success: true
        })

        await data.save()

      
   res.status(200).json({ data, success: true })


    }
    else {
        res.status(400).json({ error: "Cant Use this Method" })
    }
}

export default connectDb(handler)