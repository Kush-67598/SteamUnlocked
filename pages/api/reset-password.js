import connectDb from '../../middleware/mongoose'
import User from '../../models/user'
import transporter from './transporter'
import otp from '../../models/otp'


const handler = async (req, res) => {
    if (req.method == "POST") {
        const { email } = req.body
        const req_user = await User.findOne({ email })

        if (!req_user) {
            res.status(400).json({ found: false })
        }
        if (req_user) {

            const Otp_arr = []
            for (let i = 0; i < 6; i++) {
                let rand = Math.floor(Math.random() * 10);
                Otp_arr.push(rand)
            }
            const Joined_str = Otp_arr.join('')
            try {
                const info = await transporter.sendMail({
                    from: `SteamUnlocked <${process.env.SMTP_USER}>`, // sender address
                    to: `${email}`, // list of receivers
                    subject: "Reset Password for the SteamUnlocked Account", // Subject line
                    text: `Hello,
                You requested to reset your password.
                Here is your One-Time Password (OTP): ${Joined_str}
                This OTP is valid for the next 10 minutes. Please do not share it with anyone.
                If you did not request this, you can ignore this email.
                – Team SteamUnlocked
`,
                    html: `<b>Your One Time Password</b> for restting the password for Account:${email} is:<b>${Joined_str}</b>`,
                });
                let otp_user = new otp({
                    email: email,
                    otp: Joined_str
                })
                await otp_user.save()
            } catch (err) {
                console.error("Error while sending mail", err);
            }
            res.status(200).json({ success: true })
        }
    }

}
export default connectDb(handler) 