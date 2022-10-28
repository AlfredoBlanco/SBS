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
    if(!/^[a-zA-z ]+$/i.test(name) || name.length < 4) error.name = 'El nombre solo puede contener letras y ser mayor a 4';

    if(email){
        if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) error.email = 'El email es inválido';
        const [exists] = await findByEmail(email);
        if(exists) error.email = 'Ya existe un usuario con este email';
    }

    if(!password || password !== passwordConfirm) error.password = 'Las contraseñas no coinciden';

    return Object.keys(error).length ? res.json(error) : next();
}

module.exports = validateUser;