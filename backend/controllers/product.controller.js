const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
    try {
        const size = await Product.countDocuments();
        if (size === 0) {
            return res.status(404).json({
                message: 'No products found'
            });
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const sortField = req.query.sortField || 'createdAt';
        const sortOrder = req.query.sortOrder || 'desc';
        const totalPages = Math.ceil(size / limit);
        const skip = (page - 1) * limit;
        const query = req.query.category ? { category: req.query.category.charAt(0).toUpperCase() + req.query.category.slice(1) } : {};
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ [sortField]: sortOrder });
        res.status(200).json({ products, page, limit, totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        stock: req.body.stock,
        discount: req.body.discount,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        tags: req.body.tags,
        rating: req.body.rating,
        totalSales: req.body.totalSales,
    });
    try {
        await product.save();
        res.status(201).json({ message: 'Product Saved' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createManyProducts = async (req, res) => {
    try {
        await Product.insertMany(req.body);
        res.status(201).json({ message: 'Products Saved' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndRemove(id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product == null) {
        return res.status(404).json({ message: 'Cannot find product' });
    }
    if (req.body.name != null) {
        product.name = req.body.name;
    }
    if (req.body.brand != null) {
        product.brand = req.body.brand;
    }
    if (req.body.category != null) {
        product.category = req.body.category;
    }
    if (req.body.stock != null) {
        product.stock = req.body.stock;
    }
    if (req.body.discount != null) {
        product.discount = req.body.discount;
    }
    if (req.body.price != null) {
        product.price = req.body.price;
    }
    if (req.body.description != null) {
        product.description = req.body.description;
    }
    if (req.body.image != null) {
        product.image = req.body.image;
    }
    if (req.body.category != null) {
        product.category = req.body.category;
    }
    if (req.body.tags != null) {
        product.tags = req.body.tags;
    }
    if (req.body.rating != null) {
        product.rating = req.body.rating;
    }
    if (req.body.totalSales != null) {
        product.totalSales = req.body.totalSales;
    }
    try {
        await product.save();
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAllProducts = async (req, res) => {
    try {
        const size = await Product.countDocuments();
        if (size === 0) {
            res.json({ message: 'No products found' });
        } else {
            await Product.deleteMany();
            res.json({
                message: 'Deleted all products',
                status: 'success',
                size,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const size = await Product.countDocuments();
        if (size === 0) {
            res.json({ message: 'No products found' });
        }
        const products = await Product.find({
            $or: [
                { name: { $regex: req.params.query, $options: 'i' } },
                { brand: { $regex: req.params.query, $options: 'i' } },
                { description: { $regex: req.params.query, $options: 'i' } },
            ],
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};