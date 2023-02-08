export{}
import { Router } from "express";
const { isAdmin, isAuth } = require('../middlewares');
const { getAllUsers, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', isAuth, isAdmin, getAllUsers);

router.delete('/:id', isAuth, isAdmin, deleteUser);

module.exports = router;