import { Router, Response, Request } from "express";
const { User } = require('../models');

const router = Router();

interface UserBody {
    name : string;
    email : string;
    password : string;
    passwordConfirm : string;
    role : number;
}

router.post('/register', async (req : Request, res : Response) => {
    try{

        const { name, email, password, passwordConfirm, role } : UserBody = req.body;

        const newProdu = new User({ name, email, password, role});
        
        await newProdu.save() 
        
        return res.json({info : 'User saved successfully'});
    }catch (e) {
        return res.json({error : e});
    }

})

router.post('/login', async (req : Request, res : Response) =>{
    return res.json('No disponible');
})

module.exports = router;