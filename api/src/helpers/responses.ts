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
interface Error extends Res {
    data : string;
}

const success = ({ res, data, status = 200 } : Success) => {
    return res.status(status).json({
        data,
    })
}

const issue = ({ res, data, status = 400 } : Error) => {
    return res.status(status).send(data);
}

const serverError = ({ res, data, status = 500 } : Error) => {
    return res.status(status).json({
        error : data,
    })
}

module.exports = {
    issue,
    serverError,
    success,
}