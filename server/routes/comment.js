import {Router} from 'express';
import { checkToken } from '../utils/checkToken.js'
import { createComment } from '../controllers/comment.js';

const router = new Router();

//Создание комментария
router.post('/:id', checkToken, createComment);

export default router;