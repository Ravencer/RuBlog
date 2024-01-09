import {Router} from 'express'
import { checkToken } from '../utils/checkToken.js'
import { createPost, getAll, getById, getMyPosts, removePost, updatePost } from '../controllers/posts.js'

const router = new Router()

//Создание статьи
router.post('/', checkToken, createPost);

//Получение всех статей
router.get('/', getAll);

//Получение выбранной статьи
router.get('/:id', getById);

//Получение статей пользователя
router.get('/user/me', checkToken, getMyPosts);

//Удаление статей
router.delete('/:id', checkToken, removePost);

//Редактирование статей
router.put('/:id', checkToken, updatePost);


export default router