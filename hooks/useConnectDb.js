import mongoose from 'mongoose'

const useConnectDb = async() => {
    if(!mongoose.connections[0].readyState){
        await mongoose.connect("mongodb+srv://Steam:s_unlocked1234@cluster0.ovfam.mongodb.net/")
    }
 
}

export default useConnectDb
