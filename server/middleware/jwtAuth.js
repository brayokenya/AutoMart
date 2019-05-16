import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errorMessage from '../helpers/responseMessages';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const generateToken = (userId, userEmail) => {
    const token = jwt.sign({ userId, userEmail }, secretKey, { expiresIn: 84600 });
    return token;
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorMessage(res, 401, 'authorization token was not provided');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.body.userId = decoded.userId;
        req.user = decoded;
        return next();
    } catch (err) {
        return errorMessage(res, 401, 'token authentication failed');
    }
};
