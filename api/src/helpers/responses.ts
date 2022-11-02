import { Response } from "express";

interface Product {
    _id : string;
    title : string;
    price : number;
    image : string;
    description : string;
    stock : boolean;
}

interface Users {
    _id : string;
    name : string;
    email : string;
    password : string;
    role : number;
}

interface Res {
    res : Response;
    status ?: number;
}

interface Success extends Res {
    data : Product | Product[] | Users[] | string;
}

const success = ({ res, data, status = 200 } : Success) => {
    return res.status(status).json({
        data,
    })
}

const error = () => {

}

const serverError = () => {

}

module.exports = {
    error,
    serverError,
    success,
}