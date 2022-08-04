const Product = require('./models/Products');


module.exports=(io : any) => {
    io.on('connection', async (socket : any) => {
        socket.on('connected', async() => {
            const ans = await Product.find()
            io.emit('data', ans);
        })
        
    })
}