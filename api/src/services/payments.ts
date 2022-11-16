const axios = require('axios');

const createLink = async () => {
    const url = 'https://api.mercadopago.com/checkout/preferences';
    const body = {
        items : [
            {
                title: "Titulo",
                description : 'primer item',
                picture_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/b1c35edc35a04345a9a2abec012b1507_9366/Campera_Acolchada_SPRT_Azul_GE1285_01_laydown.jpg',
                quantity: 1,
                unit_price: 500
            },
            {
                title: "Titulo",
                description : 'segundo item',
                picture_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/b1c35edc35a04345a9a2abec012b1507_9366/Campera_Acolchada_SPRT_Azul_GE1285_01_laydown.jpg',
                quantity: 1,
                unit_price: 100
            }
        ],
        payment_methods : {
            installments : 1,
        },
        back_urls: {
            success : "/success",
            failure : "url",
            pending : "url",
        },
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