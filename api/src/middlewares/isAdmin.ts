import { Request, Response, NextFunction } from 'express';
const { issue, serverError } = require('../helpers/responses');

interface AuthRequest extends Request {
    userRole : number;
}

const isAdmin = async (req : AuthRequest, res : Response, next : NextFunction) => {
    try{
        const { userRole } = req;

        return userRole === 1 ? next() : issue({
            res,
            data: 'Access denied',
            status: 401,
        });
        
    } catch(e) {
        return serverError({
            res,
            data: e,
        });
    }
};

module.exports = isAdmin;