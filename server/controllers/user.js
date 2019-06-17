/* eslint-disable-next-line */
import regenratorRuntime from 'regenerator-runtime';
import bcrypt from 'bcrypt';
import userQueries from '../models/db/queries';
import { generateToken } from '../middleware/jwtAuth';
import errorMessage from '../helpers/responseMessages';

const signupUser = async (req, res) => {
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

export default signupUser;
