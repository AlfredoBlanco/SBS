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
const axios = require('axios');
const { Buy } = require('../models');
const { PaymentBody } = require('../interfaces');
const createLink = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://api.mercadopago.com/checkout/preferences';
    const body = {
        items,
        payment_methods: {
            installments: 1,
        },
        back_urls: {
            success: `${process.env.CLIENT_URL}/`,
            pending: `${process.env.CLIENT_URL}/`,
            failure: `${process.env.CLIENT_URL}/`,
        },
        notification_url: `${process.env.API_URL}/payment/notification`,
    };
    const payment = yield axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        }
    });
    return payment.data;
});
const getAllBuys = () => __awaiter(void 0, void 0, void 0, function* () { return yield Buy.find(); });
const saveBuy = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const newBuy = new Buy({
        data_id: body.data.id,
        type: body.type,
        action: body.action,
        mp_userId: body.user_id,
        date_created: body.date_created,
    });
    yield newBuy.save();
    return newBuy;
});
module.exports = {
    createLink,
    getAllBuys,
    saveBuy,
};
