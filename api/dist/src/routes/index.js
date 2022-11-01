"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } = require('../controllers/products');
const { isAdmin, isAuth, validateProduct } = require('../middlewares');
const router = (0, express_1.Router)();
router.get('/', getAllProducts);
router.post('/', isAuth, isAdmin, validateProduct, createProduct);
router.get('/:id', getOneProduct);
router.put('/:id', isAuth, isAdmin, updateProduct);
router.delete('/:id', isAuth, isAdmin, deleteProduct);
module.exports = router;
