"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price, image, description } = req.body;
    let error = {};
    if (!title || !/^[a-zA-z ]+$/i.test(title) || title.length < 4)
        error.title = 'El nombre solo puede contener letras y ser mayor a 4';
    if (!Number(price))
        error.price = 'El precio tiene que ser un valor numérico';
    if (!image || !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(image))
        error.image = 'La imagen tiene que ser una dirección url';
    return Object.keys(error).length ? res.json(error) : next();
});
module.exports = validateProduct;
