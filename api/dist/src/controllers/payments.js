"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createLink } = require('../services/payments');
const { issue, serverError, success } = require('../helpers/responses');
const { saveBuy, getAllBuys } = require('../services/payments');
const getBuys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buys = yield getAllBuys();
        return success({
            res,
            data: buys
        });
    }
    catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
});
const getLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req.body;
    try {
        if (!items || typeof items !== 'object' || !items.length)
            return issue({
                res,
                data: 'Items not provided',
                status: 403
            });
        const { init_point } = yield createLink(items);
        return success({
            res,
            data: init_point,
        });
    }
    catch (e) {
        return serverError({
            res,
            data: e,
        });
    }
});
const saveBuyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (body.topic)
        return res.status(200).send('OK');
    try {
        const BuyData = yield saveBuy(body);
        if (!BuyData)
            return issue({ res, data: 'Payment details were not saved, try again' });
        return res.status(200).send('OK');
    }
    catch (e) {
        return serverError({ res, data: e });
    }
});
module.exports = {
    getLink,
    saveBuyData,
    getBuys,
};
