import express from "express"
import { googleSignIn } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.get("/google",googleSignIn)

export default authRouter