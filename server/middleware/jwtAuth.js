import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errorMessage from '../helpers/responseMessages';
import { userQueries } from '../helpers/queries';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const generateToken = (userId, userEmail) => {
    const token = jwt.sign({ userId, userEmail }, secretKey, { expiresIn: 84600 });
    return token;
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorMessage(res, 401, 'Authorization token was not provided');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.body.userId = decoded.userId;
        req.user = decoded;
        return next();
    } catch (err) {
        return errorMessage(res, 401, 'Invalid authorization token');
    }
};

export const getUserFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        const { userEmail } = decoded;
        const user = userQueries.findUserByEmail(userEmail);
        return user;
    } catch (error) {
        return false;
    }
};
