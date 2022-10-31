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
const jwt = require('jsonwebtoken');
const generateJWT = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const generated = yield jwt.sign(Object.assign({}, user), process.env.JWT_SECRET, {
        expiresIn: '72h',
    });
    return generated;
});
const validateJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield jwt.verify(token, process.env.JWT_SECRET);
    return user;
});
module.exports = {
    generateJWT,
    validateJWT,
};
