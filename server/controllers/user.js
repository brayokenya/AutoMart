/* eslint-disable-next-line */
import regeneratorRuntime from 'regenerator-runtime';
import dotenv from 'dotenv';
import { userQueries } from '../helpers/queries';
import { generateToken } from '../middleware/jwtAuth';
import errorMessage from '../helpers/responseMessages';
import mailgun from '../config/mailgun.config';
import generateMessageData from '../helpers/messageData';

dotenv.config();

export const signupUser = (req, res) => {
    const existingUser = userQueries
        .findUserByEmail(req.body.email);
    if (existingUser) {
        return errorMessage(res, 409, 'Email is already in use');
    }
    const {
        firstName,
        lastName,
        email,
        password,
        address
    } = req.body;

    const trimmedValues = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        address: address.trim(),
        password: password.trim()
    };

    const newUser = userQueries.createUser(trimmedValues);
    const token = generateToken(newUser.id, newUser.email);

    return res.status(201).json({
        status: 'success',
        message: `Welcome, ${newUser.firstName}!`,
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
        return errorMessage(res, 404, 'Incorrect email or password');
    }

    const isUser = existingUser.password === password.trim();

    return isUser
        ? res.status(200).json({
            status: 'success',
            message: `Welcome back, ${existingUser.firstName}!`,
            data: {
                token: generateToken(existingUser.id, existingUser.email),
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        })
        : errorMessage(res, 404, 'Incorrect email or password');
};

export const sendResetPasswordLink = async (req, res) => {
    const user = userQueries
        .findUserByEmail(req.body.email.trim());
    if (!user) return errorMessage(res, 404, 'User account not found');
    const token = generateToken(user.id, user.email);
    const resetLink = `${process.env.APP_URL}/auth/reset-password/${token}`;
    const messageData = generateMessageData(user, resetLink);
    try {
        await mailgun.messages().send(messageData);
        return res.status(200).json({
            status: 'success',
            message: 'A password-reset link has been sent to your email'
        });
    } catch (error) {
        return errorMessage(res, 500, 'Oops! Something went wrong');
    }
};
