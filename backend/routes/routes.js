const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const User = require('../controllers/user.controller');

router.get('/', (req, res) => {
    res.send(
        `
       <div style="text-align: center; margin-top: 50px;">
            <h1>REST API</h1>
            <h2>Products</h2>
            <a href=${'http://localhost:' + process.env.PORT + '/products'}>Get all products</a>
            <h2>Users</h2>
            <a href=${'http://localhost:' + process.env.PORT + '/user'}>Get all users</a>
        </div>
    `
    );
});

router.get('/products', ProductController.getAllProducts);

router.get('/products/:id', ProductController.getProductById);

router.post('/products', ProductController.createProduct);

router.post('/products/many', ProductController.createManyProducts);

router.delete('/products/:id', ProductController.deleteProduct);

router.patch('/products/:id', ProductController.updateProduct);

router.delete('/all/products', ProductController.deleteAllProducts);

router.post('/register', User.register);

router.post('/login', User.login);

router.get('/user', User.getAllUsers);

router.get('/user/details', User.getUserDetails);

router.get('/user/:id', User.getUserById);

router.delete('/user/:id', User.deleteUser);

router.delete('/users', User.deleteAllUsers);

router.patch('/user/:id', User.updateUser);

router.post('/user/cart', User.addToCart);

router.post('/user/cart/update', User.updateCart);

router.get('/cart', User.getCart);

router.get('/search/:query', ProductController.searchProducts);

module.exports = router;