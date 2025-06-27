import connectDb from "../../../middleware/mongoose";
import comments from "../../../models/comments";
import jwt from "jsonwebtoken";
import user from "../../../models/user";
import nodemailer from "nodemailer"; // ✅ FIXED: Add `from` import

const handler = async (req, res) => {
  
  if (req.method != "POST") {
    return res.status(403).json({ error: "WRONG METHOD IS USED" })
  }
  const { slug, content,category } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(540).json({ error: "No Token Found" })

  }

  const decoded = jwt.verify(token, "jwtsecret")
  if (!slug || !content) {
    return res.status(400).json({ success: false, message: "Missing slug or content" });
  }
  const verified_user = await user.findOne({ email: decoded.email })

  const c = new comments({
    userId: verified_user._id,
    slug, content,category  })
  await c.save()


  const populatedComment = await c.populate("userId", "name email");  //this means in userid populate the name and email fields.
  res.status(200).json({ success: true, message: "Comment added", c: populatedComment });
}

export default connectDb(handler);
