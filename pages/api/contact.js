import connectDb from "../../middleware/mongoose"
import contact from "../../models/contact"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    try {
      let data = new contact({
        value: text
      });
      await data.save();
      return res.status(200).json({ message: "Contact saved", data });
    } catch (error) {
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.status(400).json({ error: "Method not allowed" });
  }
};


export default connectDb(handler)