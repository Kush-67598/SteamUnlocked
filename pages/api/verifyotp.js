import connectDb from '../../middleware/mongoose'
import otp from '../../models/otp'


const handler = async (req, res) => {
    if (req.method == "POST") {
        const {Otp,email}=req.body    
        const user_email=await otp.findOne({email:email})
        try{

            if(user_email.otp==Otp){
                res.status(200).json({success:true,message:"OTP Verified successfully"})
    
            }else{
                res.status(400).json({success:false,message:"Wrong OTP Entered"})
            }
        }catch(error){
            res.status(500).json({error:"Internal Server Error"})

        }

       

    }

}
export default connectDb(handler) 