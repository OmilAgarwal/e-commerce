const mongoose = require('mongoose');
const productSchema = require('../models/product.model');
const userSchema = require('../models/user.model');

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error(error);
  }
};

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

module.exports = { connectDB, Product, User };
