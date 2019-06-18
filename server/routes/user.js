import express from 'express';
import { validateSignup, validateSignin } from '../middleware/vaidators/user';
import { signupUser, loginUser } from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', validateSignup, signupUser);
router.post('/auth/signin', validateSignin, loginUser);

export default router;