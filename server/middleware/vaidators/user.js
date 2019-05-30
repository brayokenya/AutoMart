import isEmail from 'validator/lib/isEmail';
import { isInvalidName } from './validator.schema';
import errorMessage from '../../helpers/responseMessages';

const validateFullName = (req, res, next) => {
    const { firstName, lastName } = req.body;
    const message = isInvalidName(firstName, 'first name', 20)
        || isInvalidName(lastName, 'last name', 20);
    return message
        ? errorMessage(res, 422, message)
        : next();
};

const validateAddress = (req, res, next) => {
    const { address } = req.body;
    if (!address) return errorMessage(res, 422, 'address was not specified');
    const invalidCharacters = address.match(/[^a-z0-9,\s.]/i);

    return invalidCharacters
        ? errorMessage(res, 422, 'address has invalid characters')
        : next();
};

export const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return errorMessage(res, 422, 'email was not provided');
    }

    return isEmail(email.trim())
        ? next()
        : errorMessage(res, 422, 'invalid email');
};

const validatePassword = (req, res, next) => {
    if (!req.body.password) {
        return errorMessage(res, 422, 'password was not provided');
    }
    return next();
};
const validateConfirmPassword = (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if (!req.body.confirmPassword) {
        return errorMessage(res, 422, 'password was not confirmed');
    }
    return password === confirmPassword
        ? next()
        : errorMessage(res, 422, 'passwords do not match');
};

export const validateSignup = [
    validateFullName,
    validateEmail,
    validateAddress,
    validatePassword
];

export const validateSignin = [validateEmail, validatePassword];
export const confirmPassword = [validatePassword, validateConfirmPassword];
