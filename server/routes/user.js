import express from 'express';
import {
    signupUser,
    loginUser,
    sendResetPasswordLink
} from '../controllers/user';
import {
    validateSignup,
    validateSignin,
    validateEmail
} from '../middleware/vaidators/user';

const router = express.Router();

router.post('/auth/signup', validateSignup, signupUser);
router.post('/auth/signin', validateSignin, loginUser);
router.post('/auth/reset-password', validateEmail, sendResetPasswordLink);

export default router;
