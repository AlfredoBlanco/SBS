"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/* https://www.youtube.com/watch?v=-bI0diefasA Minuto 41:23 */
try {
    mongoose_1.default.connect('mongodb://localhost/products')
        .then(db => console.log('DB is connected'));
}
catch (e) {
    console.log('Error occurred', e);
}
