import { Request, Response } from "express";
const { createUser } = require('../services/users');


const register = async(req : Request, res: Response) => {
    try{

        await createUser({ ...req.body });        
        //Generar JWT
        return res.json({info : 'User saved successfully'});
    }catch (e) {
        return res.json({error : e});
    }
}

module.exports = {
    register,
}