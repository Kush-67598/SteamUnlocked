import connectDb from "../../../middleware/mongoose"
import reqgames from "../../../models/reqgames"
import nodemailer from "nodemailer";
const handler = async (req, res) => {
    if (req.method == "POST") {
        const { text, email } = req.body
        let data = new reqgames({
            text, email, success: true
        })

        await data.save()

        // try {
        //     const transporter = nodemailer.createTransport({
        //         host: "smtp.gmail.com",
        //         port: 587,
        //         secure: false, // upgrade later with STARTTLS
        //         auth: {
        //             user: process.env.SMTP_USER,
        //             pass: process.env.SMTP_PASS,
        //         },
        //     });
        //     await transporter.verify();
        //     console.log("Server is ready to take our messages");

        //     try {
        //         const info = await transporter.sendMail({
        //             from: `"SteamUnlocked" <${process.env.SMTP_USER}>`, // ✅ Authenticated sender
        //             to: email,                           // ✅ You receive the email
        //             // replyTo: email,                                      // ✅ Clicking "Reply" sends to user
        //             subject: "New Game Request Received",
        //             text: `Game Requested: ${text}`,
        //             html: `<b>Game Requested By you is:</b> ${text}<br/> and you will get the reciept shortly...`,
        //         });


        //         console.log("Message sent: %s", info.messageId);
        //         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //         res.status(200).json({ data, success: true })

        //     } catch (err) {
        //         console.error("Error while sending mail", err);
        //         res.status(403).json({ err: "error" })

        //     }


        // } catch (err) {
        //     console.log(err)
        //     res.status(200).json({ err: "error" })

        // }
   res.status(200).json({ data, success: true })


    }
    else {
        res.status(400).json({ error: "Cant Use this Method" })
    }
}

export default connectDb(handler)