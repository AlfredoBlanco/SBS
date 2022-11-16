import { Router } from "express";
const { getLink } = require('../controllers/payments');

const router = Router();

router.post('/', getLink);

module.exports = router;