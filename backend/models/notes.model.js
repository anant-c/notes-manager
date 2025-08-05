import mongoose, { mongo } from "mongoose";

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:{
        type: String,
        maxLength: 250,
    }
})

const Note = mongoose.model('Note', noteSchema)

export default Note