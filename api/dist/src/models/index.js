"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true }
});
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
});
const BuySchema = new Schema({
    data_id: { type: String, required: true },
    type: { type: String, required: true },
    action: { type: String, required: true },
    mp_userId: { type: Number, required: true },
    date_created: { type: Date, required: true },
});
const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);
const Buy = mongoose.model('Buy', BuySchema);
module.exports = {
    Product,
    User,
    Buy,
};
