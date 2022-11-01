const validateUser = require('./validateUser');
const validateProduct = require('./validateProduct');
const isAuth = require('./isAuth');
const isAdmin = require('./isAdmin');

module.exports = {
    validateUser,
    validateProduct,
    isAuth,
    isAdmin
}