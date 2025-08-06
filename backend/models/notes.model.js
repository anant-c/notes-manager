import mongoose, { mongo } from "mongoose";

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        maxLength: 125,
        required: true
    },
    content:{
        type: String,
        maxLength: 250
    }
},
{
    timestamps: true
}
)

const Note = mongoose.model('Note', noteSchema)

export default Note