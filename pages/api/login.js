import connectDb from "../../middleware/mongoose";
import user from "../../models/user";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === "POST") {  // Ensure POST method for login
        try {
            let u = await user.findOne({ "email": req.body.email });

            // If user not found, return early
            if (!u) {
                return res.status(400).json({ error: "User not found" });
            }

            // Decrypt the password and compare it with the request body
            const decryptedPass = CryptoJS.AES.decrypt(u.password, "secretkey").toString(CryptoJS.enc.Utf8);

            if (req.body.email === u.email && req.body.password === decryptedPass) {
                // Generate the JWT token
                var token = jwt.sign({ email: u.email, name: u.name }, 'jwtsecret', { expiresIn: "1h" });
                return res.status(200).json({ success: true, token, email: u.email, name: u.name });
            } else {
                return res.status(400).json({ error: "Invalid Credentials" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Server error" });
        }
    } else {
        return res.status(400).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
