import jwt from 'jsonwebtoken'

export const checkToken = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken.id;

            next();
        }
        catch(err){
            return res.json({message: 'У вас нет доступа!'})
        }
    }
    else{
        return res.json({message: 'У вас нет доступа!'})
    }
}