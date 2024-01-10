import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        comment:{
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    {timestamps: true}
);

export default mongoose.model('Comments', CommentSchema);