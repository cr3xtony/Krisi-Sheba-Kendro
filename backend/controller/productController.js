import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'sample name',
    quality: 'Excellent',
    category: 'Vagetable',
    price: '0',
    countInStock: '0',
    weight: '0',
    originZone: 'dhaka',
    originArea: 'dhaka',
    originPostCode: '1204',
    krisiCardNumber: '1234',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    quality,
    category,
    price,
    countInStock,
    weight,
    originZone,
    originArea,
    originPostCode,
    krisiCardNumber,
    image,
  } = req.body;

  const userId = await User.findOne({ krisiCardNumber });

  const createdUserId = req.user._id;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.quality = quality;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
    product.weight = weight;
    product.originZone = originZone;
    product.originArea = originArea;
    product.originPostCode = originPostCode;
    product.krisiCardNumber = krisiCardNumber;
    product.userId = userId._id;
    product.createdBy = createdUserId;
    product.image = image;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};
