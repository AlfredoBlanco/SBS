import { Request, Response } from "express";
const { createUser, findByEmail, loginUser } = require('../services/users');
const { success, issue, serverError } = require('../helpers/responses');


const register = async(req : Request, res: Response) => {
    try{

        await createUser({ ...req.body });
        return success({
            res,
            data : 'User saved successfully',
            status : 201,
        })
    }catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
}

const login = async(req : Request, res: Response) => {
    const { email, password } = req.body;
    try{
        const [logged] = await findByEmail(email);
        
        if(!logged) return issue({
            res,
            data: 'User not found',
            status: 404,
        });

        const { error, token } = await loginUser(password, logged);
        
        return error 
            ? issue({
                res,
                data : error,
                status: 403
            })
            : success({
                res,
                data : token,
            }); 
    }catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
}

module.exports = {
    register,
    login,
}
