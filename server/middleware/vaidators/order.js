import errorMessage from '../../helpers/responseMessages';

const validateOffer = (req, res, next) => {
    const { offer } = req.body;
    if (!offer) return errorMessage(res, 422, 'Offer was not specified');
    if (isNaN(+offer)) {
        return errorMessage(res, 422, 'Invalid offer');
    }
    const count = offer.toString().length;
    if (count > 12) return errorMessage(res, 422, 'Did you mean that?');
    req.body.offer = +offer;
    return next();
};

const validateCarId = (req, res, next) => {
    const { carId } = req.body;
    req.body.carId = +carId;
    if (!carId) return errorMessage(res, 422, 'Car id was not specified');
    return isNaN(+carId)
        ? errorMessage(res, 422, 'Order could not be placed. Ad does not exist')
        : next();
};

const validateNewOffer = (req, res, next) => {
    const { newOffer } = req.body;
    if (!newOffer) return errorMessage(res, 422, 'New offer was not specified');
    if (isNaN(+newOffer)) {
        return errorMessage(res, 422, 'Invalid input. New offer should be a number');
    }
    const count = newOffer.toString().length;
    if (count > 12) return errorMessage(res, 422, 'Did you mean that?');
    req.body.newOffer = +newOffer;
    return next();
};

export const validatePostOrder = [validateOffer, validateCarId];
export const validatePatchOrder = validateNewOffer;
