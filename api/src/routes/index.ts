import { Router, Response, Request } from "express";
const Product = require('../models/Products');

const router = Router();

interface Produ {
    _id : string,
    title : string,
    price : number,
    image : string,
    description : string,
    stock : boolean
    
}


router.get('/', async (req : Request, res : Response) => {
    try {

        const products : Produ[] = await Product.find();
        
        return res.json(products)
    } catch(e) {
        return res.json({error : e});
    }
})

router.post('/add', async (req : Request, res : Response) => {
    try{

        const { title, price, image, description, stock } : { title : string, price : number,
            image : string, description : string, stock : boolean } = req.body;
        const newProdu = new Product({ title, price, image, description, stock});
        
        await newProdu.save() 
        
        return res.json({info : 'Product saved successfully'});
    }catch (e) {
        return res.json({error : e});
    }

})

router.get('/:id', async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        const product : Produ = await Product.findById(id);
        return res.json(product);

    } catch (e) {
        return res.json({error : e});
    }
})

router.put('/:id', async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        const { title, price, image, description, stock } : { title : string, price : number,
            image : string, description : string, stock : boolean } = req.body;
        
        await Product.updateOne({_id : id}, {title, price, image, description, stock});

        return res.json({info : 'Updated successfully'});

    } catch (e) {
        return res.json({error : e});
    }
})

router.delete('/:id', async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        await Product.deleteOne({_id : id});
        
        return res.json({info : 'Deleted successfully'});

    } catch (e) {
        return res.json({error : e});
    }
})
module.exports = router;