import { Request, Response } from "express";
const { createUser, findByEmail, loginUser } = require('../services/users');



const register = async(req : Request, res: Response) => {
    try{

        await createUser({ ...req.body });
        return res.json({info : 'User saved successfully'});
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
        
        return error ? res.json({ error }) : res.json({ token }); 
    }catch (e) {
        return res.json({error : e});
    }
}

module.exports = {
    register,
    login,
}
