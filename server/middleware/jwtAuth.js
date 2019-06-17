/* eslint-disable-next-line */
import regenratorRuntime from 'regenerator-runtime';
import jwt from 'jsonwebtoken';
import appVariables from '../config/app.config';
import errorMessage from '../helpers/responseMessages';

const { secretKey } = appVariables;

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
