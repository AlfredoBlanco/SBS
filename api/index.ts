const app = require('./src/app');
const socketio = require('socket.io');
const http = require('http');
require('dotenv').config();
const { PORT } = process.env;
const sockets = require('./src/socket');


const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin : "*",
        methods : ['GET', 'POST']
    }
});
sockets(io);


server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}...`));
