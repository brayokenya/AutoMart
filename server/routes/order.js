import express from 'express';
import { verifyToken } from '../middleware/jwtAuth';
import {
    validatePostOrder,
    validatePatchOrder
} from '../middleware/vaidators/order';
import { createOrder, updateOrder } from '../controllers/order';

const router = express.Router();

router.post('/order', verifyToken, validatePostOrder, createOrder);
router.patch('/order/:orderId/price', verifyToken, validatePatchOrder, updateOrder);

export default router;
