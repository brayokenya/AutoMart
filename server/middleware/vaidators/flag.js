import errorMessage from '../../helpers/responseMessages';

const validateReason = (req, res, next) => {
    const { reason } = req.body;
    if (!reason) return errorMessage(res, 422, 'Reason was not specified');
    if (!isNaN(+reason)) return errorMessage(res, 422, 'Invalid reason');

    const isTooLong = reason.trim().length > 100;
    if (isTooLong) return errorMessage(res, 422, 'Reason should not exxceed 100 characters');

    req.body.reason = reason.trim();
    return next();
};

const validateDescription = (req, res, next) => {
    const { description } = req.body;
    const isInvalid = description && !isNaN(+description);
    if (isInvalid) return errorMessage(res, 422, 'Invalid description');
    if (description) req.body.description = description.trim();
    return next();
};

const validateCarId = (req, res, next) => {
    const { carId } = req.body;
    if (!carId) return errorMessage(res, 422, 'Car id was not specified');

    req.body.carId = +carId;
    return next();
};

const validateFlag = [validateCarId, validateReason, validateDescription];

export default validateFlag;
