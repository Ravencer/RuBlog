import Comments from '../models/Comments.js';
import Posts from '../models/Posts.js';

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body;

        if(!comment) return res.json({message: 'Невозможно создать пустой комментарий!'})

        const newComment = new Comments({comment});
        await newComment.save();

        try {
            await Posts.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })
        } catch (error) {
            console.log(error);
        }

        res.json(newComment);
    } catch (error) {
        console.log(error);
        res.json({message: 'Что-то пошло не так...'})
    }
}
