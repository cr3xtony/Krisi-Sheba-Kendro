import express from 'express';
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';
import { admin, protect } from '../middlware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router
  .route('/:id')
  .put(protect, admin, updateProduct)
  .get(getProductById)
  .delete(protect, admin, deleteProduct);

export default router;
