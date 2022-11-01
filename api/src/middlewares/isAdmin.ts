import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    userRole : number;
}

const isAdmin = async (req : AuthRequest, res : Response, next : NextFunction) => {
    try{
        const { userRole } = req;

        return userRole === 1 ? next() : res.json({ error : 'Access denied' });
        
    } catch(e) {
        return res.json(e);
    }
};

module.exports = isAdmin;