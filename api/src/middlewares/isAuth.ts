import { Request, Response, NextFunction } from 'express';
const { validateJWT } = require('../helpers/jwt');
const { findByEmail } = require('../services/users');
const { issue, serverError } = require('../helpers/responses');

interface AuthRequest extends Request {
    userRole : number;
}

const isAuth = async (req : AuthRequest, res : Response, next : NextFunction) => {
    let user
    try{

        const token = req.headers.authorization?.split(' ');
        if(!token) return issue({
            res,
            data: 'Token not provided',
        });
        try{

            user = await validateJWT(token[1]);

        } catch(err) {
            return issue({
                res,
                data: 'Invalid token',
                status: 403,
            });
        }

        const [logged] = await findByEmail(user.email);
        if(!logged) return issue({
            res,
            data: 'User not found',
            status: 404,
        });

        req.userRole = logged.role;
        
        return next();
        
    } catch(e) {
        return serverError({
            res,
            data: e,
        });
    }
};

module.exports = isAuth;