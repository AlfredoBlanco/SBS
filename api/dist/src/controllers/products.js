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
const { allProducts, newProduct, oneProduct, productDelete, productUpdate } = require('../services/products');
const { success } = require('../helpers/responses');
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield allProducts();
        return success({
            res,
            data: products
        });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, image, description, stock } = req.body;
        yield newProduct({ title, price, image, description, stock });
        return success({
            res,
            data: 'Product saved successfully',
            status: 201,
        });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield oneProduct(id);
        return success({
            res,
            data: product
        });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, price, image, description, stock } = req.body;
        yield productUpdate(id, { title, price, image, description, stock });
        return success({
            res,
            data: 'Updated successfully',
        });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield productDelete(id);
        return success({
            res,
            data: 'Deleted successfully',
        });
    }
    catch (e) {
        return res.json({ error: e });
    }
});
module.exports = {
    createProduct,
    deleteProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
};
