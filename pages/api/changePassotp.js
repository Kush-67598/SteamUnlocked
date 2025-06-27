import connectDb from '../../middleware/mongoose'
import user from '../../models/user'
var CryptoJS=require("crypto-js")



const handler = async (req, res) => {
    try{

    if (req.method == "POST") {   
        const {email,finalPass}=req.body
        console.log("Email is :"+email)
        console.log("user password is :"+finalPass)
        let user_email=await user.findOne({email:email})
       let decryptedpass=CryptoJS.AES.decrypt(user_email.password,'secretkey').toString(CryptoJS.enc.Utf8)
       console.log("current pasword in the database:"+decryptedpass)
        decryptedpass=finalPass
        console.log("decrypted password updated to user new password:"+decryptedpass)
        user_email.password=decryptedpass
    
        console.log("current password in database:"+user_email.password)


        let encrypted_pass=CryptoJS.AES.encrypt(user_email.password,'secretkey').toString()
        user_email.password=encrypted_pass
        await user_email.save()       

        res.status(200).json({success:true})
  
    }else{
        res.status(400).json({success:false})
    }
        }
catch(err){
    res.status(500).json({server:false})
}

}
export default connectDb(handler) 