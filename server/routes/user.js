import express from 'express';
import { signupUser, loginUser } from '../controllers/user';
import { validateSignup, validateSignin } from '../middleware/validator';

const router = express.Router();

router.post('/auth/signup', validateSignup, signupUser);
router.post('/auth/signin', validateSignin, loginUser);

export default router;
