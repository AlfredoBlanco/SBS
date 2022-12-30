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
const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);
module.exports = {
    Product,
    User,
};
