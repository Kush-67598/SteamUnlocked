import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { token, slug, title, img, size } = req.body;

  const decoded = jwt.verify(token, "jwtsecret");
  const userEmail = decoded.email;

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(400).json({ success: true, message: "User Not Found" });
  }
  const wishlistExists = user.wishlist.find((item) => item.slug == slug);
  if (!wishlistExists) {
    user.wishlist.push({slug,title,img,size});
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Added to wishlist" });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "Already in wishlist" });
  }
};

export default connectDb(handler);
