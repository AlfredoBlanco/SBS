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
const { validateJWT } = require('../helpers/jwt');
const { findByEmail } = require('../services/users');
const { issue, serverError } = require('../helpers/responses');
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let user;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ');
        if (!token)
            return issue({
                res,
                data: 'Token not provided',
            });
        try {
            user = yield validateJWT(token[1]);
        }
        catch (err) {
            return issue({
                res,
                data: 'Invalid token',
                status: 403,
            });
        }
        const [logged] = yield findByEmail(user.email);
        if (!logged)
            return issue({
                res,
                data: 'User not found',
                status: 404,
            });
        req.userRole = logged.role;
        return next();
    }
    catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
});
module.exports = isAuth;
