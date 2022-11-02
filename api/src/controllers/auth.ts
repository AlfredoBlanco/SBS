import { Request, Response } from "express";
const { createUser, findByEmail, loginUser } = require('../services/users');
const { success } = require('../helpers/responses');


const register = async(req : Request, res: Response) => {
    try{

        await createUser({ ...req.body });
        return success({
            res,
            data : 'User saved successfully',
            status : 201,
        })
    }catch (e) {
        return res.json({error : e});
    }
}

const login = async(req : Request, res: Response) => {
    const { email, password } = req.body;
    try{
        const [logged] = await findByEmail(email);
        
        if(!logged) return res.json({error : 'User not found'});

        const { error, token } = await loginUser(password, logged);
        
        return error 
            ? res.json({ error })
            : success({
                res,
                data : token,
            }); 
    }catch (e) {
        return res.json({error : e});
    }
}

module.exports = {
    register,
    login,
}
