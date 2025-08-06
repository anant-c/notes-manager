import Note from '../models/notes.model.js';  // adjust the path if needed

// Create a new note
export const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: "userId and title are required" });
    }

    const note = new Note({ userId, title, content });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }); // Only fetch notes for this user
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update note by ID
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete note by ID
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
