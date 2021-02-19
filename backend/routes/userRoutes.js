import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserById,
  registerUser,
  deleteUser,
} from '../controller/userController.js';
import { protect, admin } from '../middlware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.route('/').post(admin, registerUser).get(protect, admin, getAllUsers);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;
