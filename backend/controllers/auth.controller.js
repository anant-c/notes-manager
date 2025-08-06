import { oauth2client } from "../config/google.js"
import axios from "axios"
import User from "../models/user.model.js"
import jwt from 'jsonwebtoken';

export const googleSignIn = async(req,res)=>{
    try {
        const {code} = req.query
        const googleRes = await oauth2client.getToken(code)
        oauth2client.setCredentials(googleRes.tokens)  

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

        const {email, name, picture} = userRes.data
        console.log("------------------------------",email, name, picture)
        let user = await User.findOne({email});

        if(!user){
            user = await User.create(
                {
                    name, 
                    email,
                    image: picture
                }
            )
        }
        const {_id} = user;
        const token = jwt.sign({_id,email}, process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )

        return res.status(200).json(
            {
                message: "Success",
                token,
                user
            }
        )
    } catch (error) {
        return res.status(500).json({

            message:`Internal Server Error:${error}`

        })
    }
}



