"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success = ({ res, data, status = 200 }) => {
    return res.status(status).json({
        data,
    });
};
const error = () => {
};
const serverError = () => {
};
module.exports = {
    error,
    serverError,
    success,
};
