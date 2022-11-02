import { Request, Response, NextFunction } from 'express';
const { findByEmail } = require('../services/users');

interface UserBody {
    name : string;
    email : string;
    password : string;
    passwordConfirm : string;
    role : number;
}

interface UserError {
    name ?: string;
    email ?: string;
    password ?: string;
}

const validateUser = async (req : Request, res : Response, next : NextFunction) => {
    const { name, email, password, passwordConfirm} : UserBody = req.body;
    let error : UserError = {};
    if(!name || !/^[a-zA-z ]+$/i.test(name) || name.length < 4) error.name = 'The name should have only letters and longer than 4 characters';

    if(email){

        if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) error.email = 'The email is invalid';
        const [exists] = await findByEmail(email);
        if(exists) error.email = 'Already exists an user with this email';

    } else {
        error.email = 'The email is required'
    }

    if(!password || password !== passwordConfirm) error.password = "The passwords don't match";

    return Object.keys(error).length ? res.json(error) : next();
}

module.exports = validateUser;