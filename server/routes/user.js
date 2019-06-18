import express from 'express';
import { validateSignup } from '../middleware/vaidators/user';
import signupUser from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', validateSignup, signupUser);

export default router;