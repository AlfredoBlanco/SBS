"use strict";
const app = require('./src/app');
const socketio = require('socket.io');
const http = require('http');
const mongoosed = require('mongoose');
require('dotenv').config();
const { PORT } = process.env;
const connection = mongoosed.connection;
/*
    mongod --dbpath /data/db --replSet "rs0" --port 27017
    mongod --dbpath /data/db1 --replSet "rs0" --port 27018
    mongod --dbpath /data/db2 --replSet "rs0" --port 27019
    mongo rs.initiate({_id : "rs0", members: [{_id : 0, host : "localhost:27017"},{_id : 1, host : "localhost:27018"},{_id : 2, host : "localhost:27019"}]})
*/
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
connection.once('open', () => {
    console.log('Mongo opened');
    const MChangeStream = connection.collection('products').watch();
    MChangeStream.on('change', () => {
        io.emit('server:changes');
    });
});
server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}...`));
