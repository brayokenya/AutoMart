import express from 'express';
import signupUser from '../controllers/user';
import validateSignup from '../middleware/validator';

const router = express.Router();

router.post('/auth/signup', validateSignup, signupUser);

export default router;
