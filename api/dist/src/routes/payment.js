"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getLink } = require('../controllers/payments');
const router = (0, express_1.Router)();
router.post('/', getLink);
module.exports = router;
