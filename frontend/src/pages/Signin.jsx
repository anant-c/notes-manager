import React from 'react'
import { googleAuth } from '../utils/api'
import {useNavigate} from "react-router-dom"
import {useGoogleLogin} from "@react-oauth/google"

const Signin = () => {
    const navigate = useNavigate()
    const responseGoogle = async(authResult)=>{
        try {
            if(authResult['code']){
                const result = await googleAuth(authResult['code'])
                const {email, name, image} = result.data.user
                console.log("user info: ", result.data.user)
                const userObj = {email,name, image}
                const token = result.data.token


                localStorage.setItem("Token", `Bearer ${token}`)
                localStorage.setItem("User Info:", JSON.stringify(userObj))
                navigate("/notes")
            }
            // console.log(authResult);
        } catch (error) {
            console.error("Error while requesting google code.", error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: ()=>{},
        flow:'auth-code'
    })

  return (
    <div>
        <h1>Welcome to Notes Manager App Signin To Continue.</h1>
        <button onClick={googleLogin}> Sign in with Google</button>
    </div>
  )
}

export default Signin