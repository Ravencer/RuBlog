import Posts from '../models/Posts.js'
import Users from '../models/Users.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

export const createPost = async (req, res) => {
    try{
        const {title, text} = req.body;
        const user = await Users.findById(req.userId);

        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newPostWithImage = new Posts({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            });
            await newPostWithImage.save();
            await Users.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage},
            })
            return res.json(newPostWithImage);
        }

        const newPost = new Posts({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })

        await newPost.save();
        await Users.findByIdAndUpdate(req.userId, {
            $push: {posts: newPost}
        })

        res.json(newPost);
    }
    catch(err){
        res.json({message: 'Что-то пошло не так...'})
    }
}