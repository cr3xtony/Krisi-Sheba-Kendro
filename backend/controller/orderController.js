import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

const addOrderItems = asyncHandler(async (req, res, next) => {
  const { orderItems, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      totalPrice,
    });
    await order.save();
    res.status(201).json('order created successfully');
  }
});

const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getMyOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

const getOrders = async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

export { addOrderItems, getOrderById, getMyOrders, getOrders };
