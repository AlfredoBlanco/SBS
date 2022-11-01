import { Request, Response, NextFunction } from 'express';

interface ProductBody {
    title : string;
    price : number;
    image : string;
    description : string;
}

interface ProductError {
    title ?: string;
    price ?: string;
    image ?: string;
    description ?: string;
}

const validateProduct = async (req : Request, res : Response, next : NextFunction) => {
    const { title, price, image, description} : ProductBody = req.body;
    let error : ProductError = {};

    if(!title || !/^[a-zA-z ]+$/i.test(title) || title.length < 4) error.title = 'El nombre solo puede contener letras y ser mayor a 4';
    
    if( !Number(price) ) error.price = 'El precio tiene que ser un valor numérico';

    if(!image || !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(image)) error.image = 'La imagen tiene que ser una dirección url';
    
    return Object.keys(error).length ? res.json(error) : next();
}

module.exports = validateProduct;