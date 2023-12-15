import {Router} from 'express'
import {register, authorization, getMe} from '../controllers/auth.js'

const router = new Router()

//Регистрация /register
router.post('/register', register)


//Авторизация /login
router.post('/authorization', authorization)

//Получение своих данных /getMe
router.get('/my-page', getMe)

export default router