import Users from '../models/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Регистрация
export const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        const tempReg = await Users.findOne({username});

        if (tempReg) return res.json({message: 'Данный логин уже используется!'});

        const diff = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, diff);

        const newUser = new Users({
            username,
            password : hash
        });

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '12d'});

        await newUser.save();

        res.json({
            newUser,
            token, 
            message: 'Успешная регистрация!'
        });
    }
    catch(err){
        res.json({message: 'Что-то пошло не так...'})
    }
}

// Авторизация
export const authorization = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await Users.findOne({username});

        if(!user) return res.json({message: 'Такого пользователя не существует!'});
        
        const tempPass = await bcrypt.compare(password, user.password);
        if(!tempPass) return res.json({message: 'Неверный пароль!'})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '12d'});
        res.json({token, user, message: 'Успешная авторизация!'});
    }
    catch(err){
        res.json({message: 'Что-то пошло не так...'});
    }
}
//Получение данных
export const getMe = async (req, res) => {
    try {
        const user = await Users.findById(req.userId);

        if(!user) return res.json({message: 'Такого пользователя не существует!'});
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '12d'});
        res.json({user, token});
    }
    catch(err){
        res.json({message: 'У вас нет доступа!'})
    }
}