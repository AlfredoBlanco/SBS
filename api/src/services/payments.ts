import type { PaymentBody } from "../interfaces";
export { };
const axios = require('axios');
const { Buy } = require('../models');
const { PaymentBody } = require('../interfaces');

interface Item {
    title: string;
    description: string;
    picture_url: string;
    quantity: number;
    unit_price: number;
}

const createLink = async (items: Item[]) => {
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

    const payment = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        }
    })

    return payment.data;

}

const getAllBuys = async () => await Buy.find();

const saveBuy = async (body: PaymentBody) => {

    const newBuy = new Buy({
        data_id: body.data.id,
        type: body.type,
        action: body.action,
        mp_userId: body.user_id,
        date_created: body.date_created,
    });

    await newBuy.save();
    return newBuy;
}

module.exports = {
    createLink,
    getAllBuys,
    saveBuy,
}