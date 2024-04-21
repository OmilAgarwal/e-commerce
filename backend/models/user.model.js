const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    allOrders: {
        type: Array,
        required: false,
    },
    cart: [
        {
            productId: {
                type: String,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            },
        },
    ],
    wishlist: {
        type: Array,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;