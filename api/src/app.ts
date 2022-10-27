import { Express, NextFunction, Response, Request } from "express";
const express = require('express');
const cors = require('cors');


const app : Express = express();
require('./database');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use((req : Request, res : Response, next : NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes'));
app.use('/users', require('./routes/users'));



module.exports = app;
