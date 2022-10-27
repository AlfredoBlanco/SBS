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
const express_1 = require("express");
const { Product } = require('../models');
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product.find();
        return res.json(products);
    }
    catch (e) {
        return res.json({ error: e });
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, image, description, stock } = req.body;
        const newProduct = new Product({ title, price, image, description, stock });
        yield newProduct.save();
        return res.json({ info: 'Product saved successfully' });
    }
    catch (e) {
        return res.json({ error: e });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield Product.findById(id);
        return res.json(product);
    }
    catch (e) {
        return res.json({ error: e });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, price, image, description, stock } = req.body;
        yield Product.updateOne({ _id: id }, { title, price, image, description, stock });
        return res.json({ info: 'Updated successfully' });
    }
    catch (e) {
        return res.json({ error: e });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield Product.deleteOne({ _id: id });
        return res.json({ info: 'Deleted successfully' });
    }
    catch (e) {
        return res.json({ error: e });
    }
}));
module.exports = router;
