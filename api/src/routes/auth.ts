import { Router, Response, Request } from "express";
const { validateUser } = require('../middlewares');
const { register } = require('../controllers/auth');

const router = Router();

router.post('/register', validateUser, register);

router.post('/login', async (req : Request, res : Response) =>{
    return res.json('No disponible');
    /* para comparar bcrypt.compare(loque viene, lo guardado) T/F */
})

module.exports = router;