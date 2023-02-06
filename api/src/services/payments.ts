const axios = require('axios');

interface Item {
    title: string;
    description: string;
    picture_url: string;
    quantity: number;
    unit_price: number;
}

const createLink = async (items : Item[]) => {
    const url = 'https://api.mercadopago.com/checkout/preferences';
    const body = {
        items,
        payment_methods : {
            installments : 1,
        },
        back_urls: {
            success: `${process.env.CLIENT_URL}/`,
            pending: `${process.env.CLIENT_URL}/`,
            failure: `${process.env.CLIENT_URL}/`,
            
        }
    };

    const payment = await axios.post(url, body, {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${process.env.ACCESS_TOKEN}`,
        }
    })

    return payment.data;
    
}

module.exports = {
    createLink,
}