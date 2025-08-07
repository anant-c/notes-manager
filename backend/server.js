import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import cors from "cors"
import authRouter from "./routes/auth.router.js"
import noteRouter from "./routes/note.router.js"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json()) 
app.use("", authRouter)
app.use("", noteRouter)

app.listen(PORT,()=>{
    connectDb()
    console.log("Started server on port 8000")
})