import isEmail from 'validator/lib/isEmail';
import errorMessage from '../helpers/responseMessages';

const validateFirstName = (req, res, next) => {
    const { firstName } = req.body;
    if (!firstName) return errorMessage(res, 422, 'First name was not provided');
    const invalidCharacters = firstName.trim().match(/[^a-z]/i);

    return invalidCharacters
        ? errorMessage(res, 422, 'Invalid first name')
        : next();
};

const validateLastName = (req, res, next) => {
    const { lastName } = req.body;
    if (!lastName) return errorMessage(res, 422, 'Last name was not provided');
    const invalidCharacters = lastName.trim().match(/[^a-z]/i);

    return invalidCharacters
        ? errorMessage(res, 422, 'Invalid last name')
        : next();
};

const validateAddress = (req, res, next) => {
    const { address } = req.body;
    if (!address) return errorMessage(res, 422, 'Address was not provided');
    const invalidCharacters = address.trim().match(/[^a-z0-9,\s.]/i);

    return invalidCharacters
        ? errorMessage(res, 422, 'Invalid address')
        : next();
};

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) return errorMessage(res, 422, 'Email was not provided');

    return isEmail(email.trim())
        ? next()
        : errorMessage(res, 422, 'Invalid email');
};

const validatePassword = (req, res, next) => {
    if (!req.body.password) return errorMessage(res, 422, 'Password was not provided');
    return next();
};

export const validateSignup = [
    validateFirstName,
    validateLastName,
    validateEmail,
    validateAddress,
    validatePassword
];

export const validateSignin = [validateEmail, validatePassword];
