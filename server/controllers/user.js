/* eslint-disable-next-line */
import regeneratorRuntime from 'regenerator-runtime';
import dotenv from 'dotenv';
import { userQueries } from '../helpers/queries';
import { generateToken, getUserFromToken } from '../middleware/jwtAuth';
import errorMessage from '../helpers/responseMessages';
import mailgun from '../config/mailgun.config';
import generateMessageData from '../helpers/messageData';

dotenv.config();

export const signupUser = (req, res) => {
    const existingUser = userQueries
        .findUserByEmail(req.body.email);
    if (existingUser) {
        return errorMessage(res, 409, 'email is already in use');
    }
    const {
        firstName,
        lastName,
        email,
        password,
        address
    } = req.body;

    const newUser = userQueries.createUser({
        firstName,
        lastName,
        email,
        password,
        address
    });
    const token = generateToken(newUser.id, newUser.email);

    return res.status(201).json({
        status: 'success',
        message: `welcome, ${newUser.firstName}!`,
        data: {
            token,
            id: newUser.id,
            firstName: newUser.firstName,
            lastName,
            email: newUser.email
        }
    });
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;
    const existingUser = userQueries.findUserByEmail(email.trim());
    if (!existingUser) {
        return errorMessage(res, 404, 'incorrect email or password');
    }

    const isUser = existingUser.password === password.trim();

    return isUser
        ? res.status(200).json({
            status: 'success',
            message: `welcome back, ${existingUser.firstName}!`,
            data: {
                token: generateToken(existingUser.id, existingUser.email),
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        })
        : errorMessage(res, 404, 'incorrect email or password');
};

export const sendResetPasswordLink = (req, res) => {
    const user = userQueries
        .findUserByEmail(req.body.email.trim());

    if (!user) return errorMessage(res, 404, 'user account not found');
    const token = generateToken(user.id, user.email);
    const resetLink = `${process.env.APP_URL}/auth/reset-password/${token}`;

    const messageData = generateMessageData(user, resetLink);
    return mailgun.messages().send(messageData, () => (
        res.status(200).json({
            status: 'success',
            message: 'a password-reset link has been sent to your email'
        })
    ));
};

export const resetPassword = (req, res) => {
    const { password } = req.body;
    const { id: userId } = getUserFromToken(req.params.token);
    if (!userId) return errorMessage(res, 404, 'user not found. reset link may have expired');
    userQueries.updatePassword(userId, password);
    return res.status(200).json({
        status: 'success',
        message: 'password was successfully updated'
    });
};
