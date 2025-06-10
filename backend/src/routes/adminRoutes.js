import express from 'express';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { listUsers } from '../controllers/adminController.js';

const router = express.Router();
router.get('/users', protect, isAdmin, listUsers);

export default router;
