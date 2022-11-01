import { Response, Request } from "express";
const { allProducts, newProduct, oneProduct,
    productDelete, productUpdate } = require('../services/products');

interface Product extends ProductBody{
    _id : string;
}

interface ProductBody {
    title : string;
    price : number;
    image : string;
    description : string;
    stock : boolean;
    
}

const getAllProducts = async (req : Request, res : Response) => {
    try {
        const products : Product[] = await allProducts();
        
        return res.json(products);

    } catch(e) {
        return res.json({error : e});
    }
}

const createProduct = async (req : Request, res : Response) => {
    try{

        const { title, price, image, description, stock } : ProductBody = req.body;

        await newProduct({ title, price, image, description, stock});
        
        return res.json({info : 'Product saved successfully'});
    }catch (e) {
        return res.json({error : e});
    }

}

const getOneProduct = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        const product : Product = await oneProduct(id);

        return res.json(product);

    } catch (e) {
        return res.json({error : e});
    }
}

const updateProduct = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        const { title, price, image, description, stock } : ProductBody = req.body;
        
        await productUpdate(id, { title, price, image, description, stock });

        return res.json({info : 'Updated successfully'});

    } catch (e) {
        return res.json({error : e});
    }
}

const deleteProduct = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        await productDelete(id);
        
        return res.json({info : 'Deleted successfully'});

    } catch (e) {
        return res.json({error : e});
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
}