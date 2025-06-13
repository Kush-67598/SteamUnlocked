import connectDb from "../../middleware/mongoose";
import user from "../../models/user";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method != "DELETE")
    return res.status(403).json("THIS METHOD IS NOT ALLOWED");
  let id = req.body;
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];
  if (!token) return res.status(403).json("TOKEN EXPIRED");
  const decoded = jwt.verify(token, "jwtsecret");
  let u = await user.findOne({ email: decoded.email });
  if (!u) return res.status(403).json("No User Found");
  u.wishlist = u.wishlist.filter((item) => item._id.toString() != id);
  await u.save();
  res.status(200).json({ success: true, wishlist: u.wishlist });
};

export default connectDb(handler);
