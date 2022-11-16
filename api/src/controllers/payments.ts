import { Request, Response } from "express";
const { createLink } = require('../services/payments');

const getLink = async (req : Request, res: Response) => {
    try{
        
        const { init_point } : { init_point : string} = await createLink();
        return res.json({ url : init_point });
    } catch (e) {
        return res.json({error : e});
    }
}

module.exports = {
    getLink,
}