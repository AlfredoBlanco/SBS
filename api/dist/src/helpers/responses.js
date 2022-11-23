"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success = ({ res, data, status = 200 }) => {
    return res.status(status).json({
        data,
    });
};
const issue = ({ res, data, status = 400 }) => {
    return res.status(status).json({
        error: data,
    });
};
const serverError = ({ res, data, status = 500 }) => {
    return res.status(status).json({
        error: data,
    });
};
module.exports = {
    issue,
    serverError,
    success,
};
