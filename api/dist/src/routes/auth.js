"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { validateUser } = require('../middlewares');
const { register, login } = require('../controllers/auth');
const router = (0, express_1.Router)();
router.post('/register', validateUser, register);
router.post('/login', login);
module.exports = router;
