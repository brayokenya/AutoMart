import errorMessage from '../../helpers/responseMessages';

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

    const rightFile = req.files[0]
        .originalname
        .match(/(.jpg|.png|.jpeg)$/g);
    if (!rightFile) return errorMessage(res, 422, 'Unsupported image type');
    return next();
};

const validateState = (req, res, next) => {
    const { state } = req.body;
    if (!state) {
        return errorMessage(res, 422,
            'Please specify the state of the automobile (new/used)');
    }
    const lowerCase = state.toLowerCase();
    return (lowerCase === 'new' || lowerCase === 'used')
        ? next()
        : errorMessage(res, 422, 'Car state can either be "new" or "used"');
};

// TODO: test for kobo
const validatePrice = (req, res, next) => {
    const { price } = req.body;
    if (!price) return errorMessage(res, 422, 'Price was not specified');
    if (isNaN(+price)) {
        return errorMessage(res, 422, 'Invalid price');
    }
    req.body.price = +price;
    const count = price.toString().length;
    return count > 12
        ? errorMessage(res, 422, 'Wow! That is expensive')
        : next();
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
            'Body type exceeds the maximum length of 20');
    }
    const invalidCharacters = bodyType.match(/[^a-z]/i);
    if (invalidCharacters) {
        return errorMessage(res, 422, 'Body type has invalid characters');
    }
    return next();
};

const validateIdParam = (req, res, next) => {
    const { carId } = req.params;
    const transFormedId = +carId;
    if (isNaN(transFormedId)) {
        return errorMessage(res, 404, 'Car not found');
    }
    req.body.carId = transFormedId;
    return next();
};

export const validatePostCar = [
    isMultipart,
    validateImageField,
    validateState,
    validatePrice,
    validateMake,
    validateModel,
    validateBodyType
];

export const validatePatchStatus = validateIdParam;
export const validatePatchPrice = [validateIdParam, validatePrice];
export const validateGetCar = validateIdParam;
