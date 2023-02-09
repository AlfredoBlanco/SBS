const app = require('./src/app');
const socketio = require('socket.io');
const http = require('http');
const mongoosed = require('mongoose');
require('dotenv').config();
const { PORT } = process.env;

const connection = mongoosed.connection;

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin : process.env.CLIENT_URL,
        methods : ['GET', 'POST']
    }
});

connection.once('open', () => {
    console.log('Mongo opened');
    const MChangeStream = connection.collection('products').watch();

    MChangeStream.on('change', () => {
        try{

            io.emit('server:changes');
        } catch(e) {
            console.log(e);
        }
    })
})


server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}...`));
