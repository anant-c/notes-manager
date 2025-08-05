import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import cors from "cors"
import passport from "passport"
import authRouter from "./routes/auth.router.js"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json()) 
app.use("", authRouter)

app.listen(PORT,()=>{
    connectDb()
    console.log("Started server on port 8000")
})