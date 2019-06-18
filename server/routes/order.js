import express from 'express';
import { verifyToken } from '../middleware/jwtAuth';
import { validatePostOrder } from '../middleware/vaidators/order';
import createOrder from '../controllers/order';

const router = express.Router();

router.post('/order', verifyToken, validatePostOrder, createOrder);

export default router;