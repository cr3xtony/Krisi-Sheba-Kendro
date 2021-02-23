import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
