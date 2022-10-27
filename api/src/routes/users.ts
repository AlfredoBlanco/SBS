import { Router, Response, Request } from "express";
const { User } = require('../models');

const router = Router();

interface Users {
    _id : string;
    name : string;
    email : string;
    password : string;
    role : number;
}

router.get('/', async (req : Request, res : Response) => {

    const users : Users[] = await User.find();

    return res.json({ users });
})

router.delete('/:id', async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        await User.deleteOne({_id : id});
        
        return res.json({info : 'Deleted successfully'});

    } catch (e) {
        return res.json({error : e});
    }
})

module.exports = router;