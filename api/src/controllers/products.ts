import { Response, Request } from "express";
const { allProducts, newProduct, oneProduct,
    productDelete, productUpdate } = require('../services/products');
const { success } = require('../helpers/responses');

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
        
        return success({
            res,
            data : products
        });

    } catch(e) {
        return res.json({error : e});
    }
}

const createProduct = async (req : Request, res : Response) => {
    try{

        const { title, price, image, description, stock } : ProductBody = req.body;

        await newProduct({ title, price, image, description, stock});
        
        return success({
            res,
            data : 'Product saved successfully',
            status : 201,
        });
    }catch (e) {
        return res.json({error : e});
    }

}

const getOneProduct = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        const product : Product = await oneProduct(id);

        return success({
            res,
            data : product
        });

    } catch (e) {
        return res.json({error : e});
    }
}

const updateProduct = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        const { title, price, image, description, stock } : ProductBody = req.body;
        
        await productUpdate(id, { title, price, image, description, stock });

        return success({
            res,
            data : 'Updated successfully',
        })

    } catch (e) {
        return res.json({error : e});
    }
}

const deleteProduct = async (req : Request, res : Response) => {
    try{

        const id : string = req.params.id;
        
        await productDelete(id);
        
        return success({
            res,
            data : 'Deleted successfully',
        })

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