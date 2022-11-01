export{}
import { Response, Request } from "express";
const { User } = require('../models');

interface Users {
    _id : string;
    name : string;
    email : string;
    password : string;
    role : number;
}

const getAllUsers = async (req : Request, res : Response) => {
    try{

        const users : Users[] = await User.find();
        return res.json({ users });
    } catch (e) {
        return res.json({error : e});        
    }
}

const deleteUser = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        await User.deleteOne({_id : id});
        
        return res.json({info : 'Deleted successfully'});

    } catch (e) {
        return res.json({error : e});
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
}