const mongoose = require("mongoose");
const Product = require('../models/ProductModel');
const ProductModel = require("../models/ProductModel");

const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

const getProducts = async () => {
  try {
    await mongoose.connect(CONNECTION_URI);

    return await Product.find();
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

const createProduct = async ({
  title,
  description,
  price
}) => {
  try {
    await mongoose.connect(CONNECTION_URI);

    const product = new ProductModel({
      title,
      description,
      price
    });
    await product.save()
  
    return product;
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

module.exports = {
  getProducts,
  createProduct,
}
