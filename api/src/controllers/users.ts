export{}
import { Response, Request } from "express";
const { User } = require('../models');
const { success, serverError } = require('../helpers/responses');

interface Users {
    _id : string;
    name : string;
    email : string;
    role : number;
}

const getAllUsers = async (req : Request, res : Response) => {
    try{

        const users : Users[] = await User.find().select('-password');
        return success({
            res,
            data : users
        });
    } catch (e) {
        return serverError({
            res,
            data: e,
        })       
    }
}

const deleteUser = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        await User.deleteOne({_id : id});
        
        return success({
            res,
            data : 'Deleted successfully',
        });

    } catch (e) {
        return serverError({
            res,
            data: e,
        })
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
}