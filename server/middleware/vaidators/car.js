import {
    isNotSpecified,
    pureNumber,
    money,
    pureString
} from './validator.schema';
import errorMessage from '../../helpers/responseMessages';


export const validatePostCar = [
    /**
     * VALIDATION ORDER:
     *  state
     *  price
     *  manufacturer
     *  model
     *  bodyType
     *  image
     */

    // STATE VALIDATION: ensure state is either new or used
    (req, res, next) => {
        const { state } = req.body;
        if (!state) {
            return errorMessage(res, 422,
                'please specify the state of the automobile (new/used)');
        }
        const lowerCase = state.toLowerCase();
        return (lowerCase === 'new' || lowerCase === 'used')
            ? next()
            : errorMessage(res, 422, 'car state can either be "new" or "used"');
    },

    // PRICE VALIDATION
    (req, res, next) => {
        const { price } = req.body;
        const message = isNotSpecified(price, 'price')
            || money.doValidation(price, 'price', 12);
        return message
            ? errorMessage(res, 422, message)
            : next();
    },

    // MANUFACTURER VALIDATION
    (req, res, next) => {
        const { manufacturer } = req.body;
        const message = isNotSpecified(manufacturer, 'manufacturer')
            || pureString.isInvalid(manufacturer, 'manufacturer')
            || pureString.isTooLong(manufacturer, 'manufacturer', 30);

        return message
            ? errorMessage(res, 422, message)
            : next();
    },

    // MODEL VALIDATION
    (req, res, next) => {
        const { model } = req.body;
        const message = isNotSpecified(model, 'model')
            || pureString.isNotAlphaNumeric(model, 'model')
            || pureString.isTooLong(model, 'model', 30);

        return message
            ? errorMessage(res, 422, message)
            : next();
    },

    // BODY TYPE VALIDATION
    (req, res, next) => {
        const { bodyType } = req.body;
        const message = isNotSpecified(bodyType, 'body type')
            || pureString.isInvalid(bodyType, 'body type')
            || pureString.isTooLong(bodyType, 'body type', 25);

        return message
            ? errorMessage(res, 422, message)
            : next();
    },

    // IMAGE VALIDATION: ensure form is multipart
    (req, res, next) => {
        if (req.headers.enctype === 'multipart/form-data') return next();
        return errorMessage(res, 422, 'form enctype has to be "multipart/form-data"');
    },

    // IMAGE VALIDATION: ensure than a maximum of one image is uploaded
    (req, res, next) => {
        if (!req.files[0]) {
            return errorMessage(res, 422, 'please upload a display image');
        }

        return req.files[1]
            ? errorMessage(res, 422, 'we currently do not support multiple images upload')
            : next();
    },

    // IMAGE VALIDATION: ensure image size does not exceed 5mb
    (req, res, next) => {
        const fileSize = req.files[0].size;
        return (fileSize > (1048576 * 5))
            ? errorMessage(res, 422, 'image size exceeds 5mb limit')
            : next();
    },

    // IMAGE VALIDATION: endure image is of the right type
    (req, res, next) => {
        const rightFile = req.files[0]
            .originalname
            .match(/(.jpg|.png|.jpeg)$/g);

        return rightFile
            ? next()
            : errorMessage(res, 422, 'unsupported image type');
    }

];

export const validateIdParam = (req, res, next) => {
    const { carId } = req.params;
    const message = isNotSpecified(carId, 'car id')
        || pureNumber.isInvalid(carId, 'car id');
    req.params.carId = +carId;
    return message
        ? errorMessage(res, 422, message)
        : next();
};


export const validatePatchPrice = [
    validateIdParam,
    // PRICE VALIDATION
    (req, res, next) => {
        const { newPrice } = req.body;
        const message = isNotSpecified(newPrice, 'new price')
            || money.doValidation(newPrice, 'new price', 12);
        return message
            ? errorMessage(res, 422, message)
            : next();
    }
];

export const validatePatchStatus = validateIdParam;
export const validateGetCar = validateIdParam;
export const validateDeleteCar = validateIdParam;


export const validateQueries = [
    // QUERY PARAMS VALIDATOR: checks if invalid properties are being queried
    (req, res, next) => {
        const values = [
            'status',
            'min_price',
            'max_price',
            'state',
            'body_type',
            'make',
            ...Object.keys(req.query)
        ];
        // size will be greater than 5 if an unrecongnised query is entered
        const querySet = new Set(values);
        const allQueries = [...querySet];

        // invalid query properties will start from position 6
        return allQueries[6]
            ? errorMessage(res, 422, `invalid query: ${allQueries[6]}`)
            : next();
    },

    // MAX PRICE VALIDATOR
    (req, res, next) => {
        const { max_price: maxPrice } = req.query;
        if (maxPrice === undefined) return next();
        req.query.max_price = +maxPrice;
        const message = money.isInvalid(maxPrice, 'maximum price');
        return message
            ? errorMessage(res, 422, message)
            : next();
    },

    // MIN PRICE VALIDATOR
    (req, res, next) => {
        const { min_price: minPrice } = req.query;
        if (minPrice === undefined) return next();
        const message = money.isInvalid(minPrice, 'minimum price');
        req.query.min_price = +minPrice;
        return message
            ? errorMessage(res, 422, message)
            : next();
    },

    // STATE VALIDATOR
    (req, res, next) => {
        const { state } = req.query;
        if (state === undefined) return next();

        const isValidState = (state === 'new') || (state === 'used');

        return !isValidState
            ? errorMessage(res, 422, 'car state can either be new or used')
            : next();
    }
];
