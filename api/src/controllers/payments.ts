import { Request, Response } from "express";
const { createLink } = require('../services/payments');
const { issue, serverError, success } = require('../helpers/responses');

const getLink = async (req : Request, res: Response) => {
    const { items } = req.body;
    try{
        if ( !items || typeof items !== 'object' || !items.length ) return issue({
            res,
            data: 'Items not provided',
            status: 403
        });
        const { init_point } : { init_point : string} = await createLink(items);
        return success({
            res,
            data: init_point,
        });
    } catch (e) {
        return serverError({
            res,
            data: e,
        })
    }
}

module.exports = {
    getLink,
}