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
        views: {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }]
    },
    {timestamps: true}
);

export default mongoose.model('Posts', PostSchema);