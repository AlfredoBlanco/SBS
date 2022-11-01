import { Router, Response, Request } from "express";
const { createProduct, deleteProduct, getAllProducts,
    getOneProduct, updateProduct } = require('../controllers/products');
const { isAdmin, isAuth, validateProduct } = require('../middlewares');

const router = Router();

router.get('/', getAllProducts)

router.post('/',isAuth, isAdmin, validateProduct, createProduct)

router.get('/:id', getOneProduct)

router.put('/:id', isAuth, isAdmin, updateProduct)

router.delete('/:id', isAuth, isAdmin, deleteProduct)

module.exports = router;