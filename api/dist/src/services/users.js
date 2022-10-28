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
const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const createUser = ({ name, email, password, role = 2 }) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = yield bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password: passwordHash, role });
    yield newUser.save();
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield User.find({ email }); });
module.exports = {
    createUser,
    findByEmail,
};
