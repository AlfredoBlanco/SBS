import { Router } from "express";
const { validateUser } = require('../middlewares');
const { register, login } = require('../controllers/auth');

const router = Router();

router.post('/register', validateUser, register);

router.post('/login', login);

module.exports = router;