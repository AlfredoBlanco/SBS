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
const { success, serverError } = require('../helpers/responses');
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().select('-password');
        return success({
            res,
            data: users
        });
    }
    catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield User.deleteOne({ _id: id, role: 2 });
        return success({
            res,
            data: 'Deleted successfully',
        });
    }
    catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
});
module.exports = {
    getAllUsers,
    deleteUser,
};
