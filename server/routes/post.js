import {Router} from 'express'
import { checkToken } from '../utils/checkToken.js'
import { createPost, getAll } from '../controllers/posts.js'

const router = new Router()

//Создание статьи
router.post('/', checkToken, createPost);

//Получение всех статей
router.get('/posts', getAll);


export default router