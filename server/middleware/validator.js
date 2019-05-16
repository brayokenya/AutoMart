import isEmail from 'validator/lib/isEmail';
import response422 from '../helpers/responseMessages';

const validateFirstName = (req, res, next) => {
    const { firstName } = req.body;
    if (!firstName) return response422(res, 'First name was not provided');
    const invalidCharacters = firstName.trim().match(/[^a-z]/i);

    return invalidCharacters
        ? response422(res, 'Invalid first name')
        : next();
};

const validateLastName = (req, res, next) => {
    const { lastName } = req.body;
    if (!lastName) return response422(res, 'First name was not provided');
    const invalidCharacters = lastName.trim().match(/[^a-z]/i);

    return invalidCharacters
        ? response422(res, 'Invalid last name')
        : next();
};

const validateAddress = (req, res, next) => {
    const { address } = req.body;
    if (!address) return response422('Address was not provided');
    const invalidCharacters = address.match.trim()(/[^a-z0-9]/i);

    return invalidCharacters
        ? next()
        : response422(res, 'Invalid address');
};

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) return response422('Email was not provided');

    return isEmail(email.trim())
        ? next()
        : response422(res, 'Invalid email');
};


const validateSignup = [validateFirstName, validateLastName, validateEmail, validateAddress];

export default validateSignup;
