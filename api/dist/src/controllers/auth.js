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
const { createUser, findByEmail, loginUser } = require('../services/users');
const { success } = require('../helpers/responses');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createUser(Object.assign({}, req.body));
        return success({
            res,
            data: 'User saved successfully',
            status: 201,
        });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const [logged] = yield findByEmail(email);
        if (!logged)
            return res.json({ error: 'User not found' });
        const { error, token } = yield loginUser(password, logged);
        return error
            ? res.json({ error })
            : success({
                res,
                data: token,
            });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
module.exports = {
    register,
    login,
};
