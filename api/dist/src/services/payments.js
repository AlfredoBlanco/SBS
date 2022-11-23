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
const axios = require('axios');
const createLink = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://api.mercadopago.com/checkout/preferences';
    const body = {
        items,
        payment_methods: {
            installments: 1,
        },
    };
    const payment = yield axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        }
    });
    return payment.data;
});
module.exports = {
    createLink,
};
