import connectDb from "../../middleware/mongoose";
import user from "../../models/user";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const { email, finalPass } = req.body;
      let user_email = await user.findOne({ email: email });
      let decryptedpass = CryptoJS.AES.decrypt(
        user_email.password,
        process.env.DECRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      decryptedpass = finalPass;
      user_email.password = decryptedpass;

      let encrypted_pass = CryptoJS.AES.encrypt(
        user_email.password,
        process.env.DECRYPTION_KEY
      ).toString();
      user_email.password = encrypted_pass;
      await user_email.save();

      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ server: false });
  }
};
export default connectDb(handler);
