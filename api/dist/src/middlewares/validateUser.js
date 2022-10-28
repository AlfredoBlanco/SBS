"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { findByEmail } = require('../services/users');
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirm } = req.body;
    let error = {};
    if (!/^[a-zA-z ]+$/i.test(name) || name.length < 4)
        error.name = 'El nombre solo puede contener letras y ser mayor a 4';
    if (email) {
        if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email))
            error.email = 'El email es inválido';
        const [exists] = yield findByEmail(email);
        if (exists)
            error.email = 'Ya existe un usuario con este email';
    }
    if (!password || password !== passwordConfirm)
        error.password = 'Las contraseñas no coinciden';
    return Object.keys(error).length ? res.json(error) : next();
});
module.exports = validateUser;
