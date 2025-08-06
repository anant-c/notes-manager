import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { getAllNotes, updateNote, createNote, deleteNote } from "../controllers/note.controller.js"

const noteRouter = express.Router()

noteRouter.get("/notes",authMiddleware,getAllNotes)
noteRouter.put("/notes/:id",authMiddleware,updateNote)
noteRouter.post("/notes",authMiddleware,createNote)
noteRouter.delete("/notes/:id",authMiddleware,deleteNote)

export default noteRouter