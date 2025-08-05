import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String
    },
    image:{
        type: String
    }
})


const User = mongoose.model('User', userSchema)

export default User
