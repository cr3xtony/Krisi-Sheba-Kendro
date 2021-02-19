import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    krisiCardNumber: { type: Number },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    quality: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    originZone: {
      type: String,
    },
    originArea: {
      type: String,
    },
    originPostCode: {
      type: Number,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
