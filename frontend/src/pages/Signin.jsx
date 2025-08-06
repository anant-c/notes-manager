import React from 'react'
import { googleAuth } from '../utils/api'
import {useNavigate} from "react-router-dom"
import {useGoogleLogin} from "@react-oauth/google"
import { Button } from "@/components/ui/button"


const Signin = () => {
    const navigate = useNavigate()
    const responseGoogle = async(authResult)=>{
        try {
            if(authResult['code']){
                const result = await googleAuth(authResult['code'])
                const {email, name, image} = result.data.user
                console.log("user info: ", result.data.user)
                const userObj = {email,name, image}
                // console.log("----------", email, name, image)
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
    <div className="min-h-screen bg-gradient-background flex-col-1 md:flex">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-xl space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold bg-[#9F6BFA] bg-clip-text text-transparent leading-tight">
              Notes Manager
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Your thoughts, organized beautifully. Capture ideas, create notes, and never lose track of what matters most.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#9F6BFA] rounded-full"></div>
              <span className="text-lg text-foreground">Lightning-fast note creation</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#9F6BFA] rounded-full"></div>
              <span className="text-lg text-foreground">Edit on the go</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#9F6BFA] rounded-full"></div>
              <span className="text-lg text-foreground">Save your notes forever</span>
            </div>
          </div>

          <div className="relative group">
            <img 
              src={"/notes.jpg"} 
              alt="Notes organization illustration" 
              className="w-full rounded-2xl shadow-soft group-hover:shadow-glow transition-all duration-500 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign In */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-gradient-card backdrop-blur-sm">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-lg">
              Sign in to access your notes and continue where you left off
            </p>
          </div>
          
          <div className="space-y-6">
            <Button 
                onClick={googleLogin}
                className="w-full bg-[#9F6BFA] hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-glow text-lg py-6 rounded-xl font-medium"
                >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                Continue with Google
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <a href="#" className="text-primary hover:text-primary-glow transition-colors underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:text-primary-glow transition-colors underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin