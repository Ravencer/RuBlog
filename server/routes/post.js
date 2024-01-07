import {Router} from 'express'
import { checkToken } from '../utils/checkToken.js'
import { createPost } from '../controllers/posts.js'

const router = new Router()

//Создание поста
router.post('/', checkToken, createPost);


export default router