const User = require('../models/user.model');
const Product = require('../models/product.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const e = require('express');
dotenv.config();

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            res.status(404).json({ message: 'No users found' });
        } else {
            res.json(users);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.register = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        allOrders: req.body.allOrders,
        cart: req.body.cart,
        wishlist: req.body.wishlist,
    });
    try {
        const newPass = await bcrypt.hash(user.password, 10);
        user.password = newPass;
        const newUser = await user.save();
        res.status(201).json(
            {
                status: 'success'
            }
        );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.json({ message: 'User Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message, status: 'failed' });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
      await User.deleteMany({ email: { $ne: 'admin@gmail.com' } });
      res.status(200).json({ message: 'All users deleted except admin' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        if (req.body.name != null) {
            user.name = req.body.name;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.password != null) {
            const newPass = await bcrypt.hash(req.body.password, 10);
            user.password = newPass;
        }
        if (req.body.address != null) {
            user.address = req.body.address;
        }
        if (req.body.phone != null) {
            user.phone = req.body.phone;
        }
        if (req.body.allOrders != null) {
            user.allOrders = req.body.allOrders;
        }
        if (req.body.cart != null) {
            user.cart = req.body.cart;
        }
        if (req.body.wishlist != null) {
            user.wishlist = req.body.wishlist;
        }
        await user.save();
        res.json({ message: 'User Updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.header('auth-token'));
        const { productId, quantity } = req.body;
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        const cart = user.cart;
        const index = cart.findIndex((item) => item.productId === productId);
        if (index === -1) {
            cart.push({ productId, quantity });
        } else {
            cart[index].quantity += quantity;
        }
        user.cart = cart;
        await user.save();
        res.json({ message: 'Cart Updated', totalItems: user.cart.length });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        user.cart = req.body;
        await user.save();
        res.json({ message: 'Cart Updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getCart = async (req, res) => {
    try {
        const token = req.header('auth-token');
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);
        const cart = user.cart;
        const products = await Product.find({ _id: { $in: cart.map((item) => item.productId) } });
        const cartItems = products.map((product) => {
            const item = cart.find((item) => item.productId === product._id.toString());
            return {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: item.quantity,
            };
        });
        res.json({ cartItems });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (isValid) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.header('auth-token', token).json({ status: 'success', token: token });
        }
        else {
            res.json({ status: 'failed', message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(400).json({ message: "Account doesn't exist", status: 'failed' });
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const token = req.header('auth-token');
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.json(
            {
                status: 'success',
                user: {
                    _id: user._id,
                    name: user.name,
                    cart: user.cart,
                    wishlist: user.wishlist,
                }
            }
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}