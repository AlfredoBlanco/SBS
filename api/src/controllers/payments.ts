import { Request, Response } from "express";
import type { Payment } from "../interfaces";
const { createLink } = require('../services/payments');
const { issue, serverError, success } = require('../helpers/responses');
const { saveBuy, getAllBuys } = require('../services/payments');

const getBuys = async (req : Request, res : Response) => {
    try{

        const buys : Payment[] = await getAllBuys();
        return success({
            res,
            data : buys
        });
    } catch (e) {
        return serverError({
            res,
            data: e,
        })       
    }
}

const getLink = async (req: Request, res: Response) => {
    const { items } = req.body;
    try {
        if (!items || typeof items !== 'object' || !items.length) return issue({
            res,
            data: 'Items not provided',
            status: 403
        });
        const { init_point }: { init_point: string } = await createLink(items);
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

const saveBuyData = async (req: Request, res: Response) => {
    const { body } = req;

    if (body.topic) return res.status(200).send('OK');

    try {
        const BuyData = await saveBuy(body);

        if (!BuyData) return issue({ res, data: 'Payment details were not saved, try again' });

        return res.status(200).send('OK');
    } catch (e) {
        return serverError({ res, data: e });
    }
};


module.exports = {
    getLink,
    saveBuyData,
    getBuys,
}