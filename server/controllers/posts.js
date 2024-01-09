import Posts from '../models/Posts.js'
import Users from '../models/Users.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

export const createPost = async (req, res) => {
    try{
        const {headline, text} = req.body;
        const user = await Users.findById(req.userId);

        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newPostWithImage = new Posts({
                username: user.username,
                headline,
                text,
                imgUrl: fileName,
                author: req.userId
            });
            await newPostWithImage.save();
            await Users.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage},
            })
            return res.json({newPostWithImage, message: 'Успешно!'});
        }

        const newPost = new Posts({
            username: user.username,
            headline,
            text,
            imgUrl: '',
            author: req.userId
        })

        await newPost.save();
        await Users.findByIdAndUpdate(req.userId, {
            $push: {posts: newPost}
        })

        res.json({newPost, message: 'Успешно!'});
    }
    catch(err){
        console.log(err);
        res.json({message: 'Что-то пошло не так...'})
    }
}

export const getAll = async(req, res) => {
    try {
        const posts = await Posts.find().sort('-createdAt')
        const popularPosts = await Posts.find().limit(5).sort('-views')

        if(!posts){
            return res.json({message: 'Статьи отстуствуют!'})
        }

        res.json({posts, popularPosts});
    } catch (error) {
        res.json({message: 'Что-то пошло не так...'})
    }
}

export const getById = async(req, res) => {
    try {
        
        const post = await Posts.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })

        res.json(post)
        
    } catch (error) {
        console.log(error)
        res.json({message: 'Что-то пошло не так...'})
    }
}

export const getMyPosts = async(req, res) => {
    try {
        
        const user = await Users.findById(req.userId);
        const list = await Promise.all(
            user.posts.map(post => {
                return Posts.findById(post._id);
            })
        );
        
        res.json(list);
        
    } catch (error) {
        console.log(error)
        res.json({message: 'Что-то пошло не так...'})
    }
}

export const removePost = async(req, res) => {
    try {
        
        const post = await Posts.findByIdAndDelete(req.params.id);
        if(!post) return res.json({message: 'Пост не найден!'})

        await Users.findByIdAndUpdate(req.userId, {
            $pull: {posts: req.params.id}
        })
        
        res.json({message: 'Успешно!'});
        
    } catch (error) {
        console.log(error)
        res.json({message: 'Что-то пошло не так...'})
    }
}

export const updatePost = async(req, res) => {
    try {
        
        const {headline, text, id} = req.body;
        const post = await Posts.findById(id);

        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            post.imgUrl = fileName || '';
        }

        post.headline = headline;
        post.text = text;

        await post.save();
        res.json(post);
        
    } catch (error) {
        console.log(error)
        res.json({message: 'Что-то пошло не так...'})
    }
}