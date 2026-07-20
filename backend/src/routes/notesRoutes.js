import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";

const router = express.Router()


router.get("/",getAllNotes)
router.get("/:id",get)
router.post("/",createNote)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router