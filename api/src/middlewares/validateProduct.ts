import { Request, Response, NextFunction } from 'express';
const { issue } = require('../helpers/responses');

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

    if(!title || !/^[a-zA-z ]+$/i.test(title) || title.length < 4) error.title = 'The title should have only letters and longer than 4 characters';
    
    if(!Number(price)) error.price = 'The price should be a numeric value';

    if(!image || !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(image)) error.image = 'The image should be an url direction';
    
    if(!description || description.length < 10) error.description = 'The description should be longer than 10 characters';

    return Object.keys(error).length 
        ? issue({
            res,
            data: error,
        })
        : next();
}

module.exports = validateProduct;