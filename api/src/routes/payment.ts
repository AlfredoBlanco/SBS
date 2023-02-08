import { Router } from "express";
const { getLink, saveBuyData, getBuys } = require('../controllers/payments');
const { isAdmin, isAuth } = require('../middlewares');

const router = Router();

router.get('/', isAuth, isAdmin, getBuys);
router.post('/', getLink);
router.post('/notification', async (req, res, next) => {
    res.status(200);
    next();
}, saveBuyData);

module.exports = router;