import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserById,
  registerUser,
  deleteUser,
  updateUserByAdmin,
  updateUserProfile,
} from '../controller/userController.js';
import { protect, admin } from '../middlware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router
  .route('/')
  .post(protect, admin, registerUser)
  .get(protect, admin, getAllUsers);
router
  .route('/:id')
  .get(protect, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUserByAdmin);
router.route('/arotdar').post(registerUser);
router.route('profile').put(protect, updateUserProfile);

export default router;
