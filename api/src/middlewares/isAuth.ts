import { Request, Response, NextFunction } from 'express';
const { validateJWT } = require('../helpers/jwt');
const { findByEmail } = require('../services/users')

interface AuthRequest extends Request {
    userRole : number;
}

const isAuth = async (req : AuthRequest, res : Response, next : NextFunction) => {
    let user
    try{

        const token = req.headers.authorization?.split(' ');
        if(!token) return res.json({ error : 'Token not provided' });
        try{

            user = await validateJWT(token[1]);

        } catch(err) {
            return res.json({ error : 'Invalid token' });
        }

        const [logged] = await findByEmail(user.email);
        if(!logged) return res.json({error : 'User not found'});

        req.userRole = logged.role;
        
        return next();
        
    } catch(e) {
        return res.json(e);
    }
};

module.exports = isAuth;