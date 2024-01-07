import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        headline:{
            type: String,
            required: true,
        },
        text:{
            type: String,
            required: true
        },
        imgUrl: [{
            type: String,
            default: ''
        }],
        Views: {
            type: Number,
            default: 0
        },
        Author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        Comments: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    },
    {timestamps: true}
);

export default mongoose.model('Posts', PostSchema);