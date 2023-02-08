"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { isAdmin, isAuth } = require('../middlewares');
const { getAllUsers, deleteUser } = require('../controllers/users');
const router = (0, express_1.Router)();
router.get('/', isAuth, isAdmin, getAllUsers);
router.delete('/:id', isAuth, isAdmin, deleteUser);
module.exports = router;
