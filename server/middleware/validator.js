import isEmail from 'validator/lib/isEmail';
import errorMessage from '../helpers/responseMessages';

const validateFirstName = (req, res, next) => {
    const { firstName } = req.body;
    if (!firstName) {
        return errorMessage(res, 422, 'First name was not provided');
    }
    const invalidCharacters = firstName.trim().match(/[^a-z]/i);

    return invalidCharacters
        ? errorMessage(res, 422, 'Invalid first name')
        : next();
};

const validateLastName = (req, res, next) => {
    const { lastName } = req.body;
    if (!lastName) {
        return errorMessage(res, 422, 'Last name was not provided');
    }
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
    if (!email) {
        return errorMessage(res, 422, 'Email was not provided');
    }

    return isEmail(email.trim())
        ? next()
        : errorMessage(res, 422, 'Invalid email');
};

const validatePassword = (req, res, next) => {
    if (!req.body.password) {
        return errorMessage(res, 422, 'Password was not provided');
    }
    return next();
};

const isMultipart = (req, res, next) => {
    if (req.headers.enctype === 'multipart/form-data') return next();
    return errorMessage(res, 422, 'Form enctype has to be "multipart/form-data"');
};

const validateImageField = (req, res, next) => {
    if (!req.files[0]) {
        return errorMessage(res, 422, 'Please upload a display image');
    } if (req.files[1]) {
        return errorMessage(res, 422,
            'We currently do not support multiple images upload');
    }
    const fileSize = req.files[0].size;
    if (fileSize > (1048576 * 5)) {
        return errorMessage(res, 422, 'Image size exceeds 5mb limit');
    }

    const wrongFiles = req.files[0]
        .originalName
        .match(/(.jpg|.png|.jpeg)$/g);
    if (wrongFiles) return errorMessage(res, 422, 'Unsupported image type');
    return next();
};

const validateState = (req, res, next) => {
    const { state } = req.body;
    if (!state) {
        return errorMessage(res, 422,
            'Please specify the state of the automobile (new.used)');
    }
    const lowerCase = state.toLowerCase();
    if (lowerCase !== 'new' || lowerCase !== 'used') {
        return errorMessage(res, 422, 'Car state can either be "new" or "used"');
    }

    return next();
};

const validatePrice = (req, res, next) => {
    const { price } = req.body;
    if (!price) return errorMessage(res, 422, 'Price was not specified');
    if (typeof (price) === 'number') {
        return errorMessage(res, 422, 'Invalid price');
    }
    const count = price.toString().length;
    if (count > 12) return errorMessage(res, 422, 'Wow! That is expensive');
    return next();
};

const validateMake = (req, res, next) => {
    const { manufacturer } = req.body;
    if (!manufacturer) {
        return errorMessage(res, 422, 'Manufacturer was not specified');
    }
    const tooLong = manufacturer.length > 30;
    if (tooLong) {
        return errorMessage(res, 422,
            "Manufacturer's name exceeds the maximum length of 30");
    }
    return next();
};


const validateModel = (req, res, next) => {
    const { model } = req.body;
    if (!model) return errorMessage(res, 422, 'Model was not specified');
    const tooLong = model.length > 30;
    if (tooLong) {
        return errorMessage(res, 422,
            "Model's name exceeds the maximum length of 30");
    }
    return next();
};

const validateBodyType = (req, res, next) => {
    const { bodyType } = req.body;
    if (!bodyType) return errorMessage(res, 422, 'Body type was not specified');
    const tooLong = bodyType.length > 20;
    if (tooLong) {
        return errorMessage(res, 422,
            "Model's name exceeds the maximum length of 30");
    }
    const invalidCharacters = bodyType.match(/[^a-z]/i);
    if (invalidCharacters) {
        return errorMessage(res, 422, 'Body type exceeds the maximun lenth of 20');
    }
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

export const validatePostCar = [
    isMultipart,
    validateImageField,
    validateState,
    validatePrice,
    validateMake,
    validateModel,
    validateBodyType
];
