import Note from "../models/Notes.js";

export function getAllNotes(req,res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getting all notes",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export function getNoteById(req,res) {
    try {
        const noteId = req.params.id
        const note = Note.findById(noteId)
        if(!note) return res.status(404).json({message:"Note not found"})
    } catch (error) {
        console.error("Error in getting note",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export function createNote(req,res) {
    try {
        const {title,content} = req.body
        const note  = new Note({title,content})
        const newNote = await note.save()
        res.status(201).json(newNote)
    } catch (error) {
        console.error("Error in creating note",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export function updateNote(req,res) {
    try {
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true
            }
        )

        if(!updatedNote) return res.status(404).json({message:"Note not found"})

        res.status(201).json({mesasge:"Note updated successfully"})
    } catch (error) {
        console.error("Error in updating note",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export function deleteNote(req,res) {
    try {
        const deletedNote = await Note.findByIdAndUpdate(req.params.id)

        if(!deletedNote) return res.status(404).json({message:"Note not found"})
            
        res.status(201).json({mesasge:"Note deleted successfully"})
    } catch (error) {
        console.error("Error in deleting note",error)
        res.status(500).json({message:"Internal server error"})
    }
}