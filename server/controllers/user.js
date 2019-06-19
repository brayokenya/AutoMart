/* eslint-disable-next-line */
import regenratorRuntime from 'regenerator-runtime';
import bcrypt from 'bcrypt';
import { userQueries } from '../models/db/queries';
import { generateToken, getUserFromToken } from '../middleware/jwtAuth';
import mailgun from '../config/mailgun.config';
import generateMessageData from '../helpers/messageData';
import errorMessage from '../helpers/responseMessages';

export const signupUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        address
    } = req.body;
    try {
        const existingUser = await userQueries.findUserByEmail(email);
        if (existingUser) return errorMessage(res, 409, 'email is already in use');

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await userQueries
            .createUser(firstName, lastName, email, passwordHash, address);
        const token = generateToken(newUser.user_id, email);
        return res.status(201).json({
            status: 'success',
            message: `welcome, ${firstName}!`,
            data: {
                token,
                id: newUser.user_id,
                firstName,
                lastName,
                email
            }
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong');
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userQueries.findUserByEmail(email);

        if (!existingUser) return errorMessage(res, 404, 'incorrect email or password');

        const passwordsMatch = await bcrypt.compare(password, existingUser.password_hash);
        if (!passwordsMatch) return errorMessage(res, 404, 'incorrect email or password');

        const { user_id: id, first_name: firstName, last_name: lastName } = existingUser;

        const token = generateToken(id, email);
        return res.status(200).json({
            status: 'success',
            message: `welcome back, ${firstName}!`,
            data: {
                token,
                id,
                firstName,
                lastName,
                email
            }
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong');
    }
};


export const sendResetPasswordLink = async (req, res) => {
    try {
        const user = await userQueries
            .findUserByEmail(req.body.email.trim());

        if (!user) return errorMessage(res, 404, 'user account not found');
        const token = generateToken(user.user_id, user.email);
        const resetLink = `${process.env.APP_URL}/auth/reset-password/${token}`;

        const messageData = generateMessageData(user, resetLink);
        return mailgun.messages().send(messageData, () => (
            res.status(200).json({
                status: 'success',
                message: 'a password-reset link has been sent to your email'
            })
        ));
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong');
    }
};

export const resetPassword = async (req, res) => {
    const { password } = req.body;
    try {
        const { user_id: userId } = await getUserFromToken(req.params.token);
        if (!userId) return errorMessage(res, 404, 'user not found. reset link may have expired');
        const passwordHash = await bcrypt.hash(password, 10);
        await userQueries.updatePassword(userId, passwordHash);
        return res.status(200).json({
            status: 'success',
            message: 'password was successfully updated'
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong');
    }
};
