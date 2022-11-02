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
    if (!name || !/^[a-zA-z ]+$/i.test(name) || name.length < 4)
        error.name = 'The name should have only letters and longer than 4 characters';
    if (email) {
        if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email))
            error.email = 'The email is invalid';
        const [exists] = yield findByEmail(email);
        if (exists)
            error.email = 'Already exists an user with this email';
    }
    else {
        error.email = 'The email is required';
    }
    if (!password || password !== passwordConfirm)
        error.password = "The passwords don't match";
    return Object.keys(error).length ? res.json(error) : next();
});
module.exports = validateUser;
