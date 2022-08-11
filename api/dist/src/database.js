"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const DB_URL = String(process.env.DB_URL);
try {
    mongoose_1.default.connect(DB_URL)
        .then(db => console.log('DB is connected'));
}
catch (e) {
    console.log('Error occurred', e);
}
