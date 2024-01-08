import {Router} from 'express'
import { checkToken } from '../utils/checkToken.js'
import { createPost, getAll, getById } from '../controllers/posts.js'

const router = new Router()

//Создание статьи
router.post('/', checkToken, createPost);

//Получение всех статей
router.get('/', getAll);

//Получение статей пользователя
router.get('/:id', getById);


export default router