import { flagQueries, carQueries } from '../helpers/queries';
import erroMessage from '../helpers/responseMessages';

const flagAd = (req, res) => {
    const {
        carId,
        reason,
        description,
        userId: reportedBy
    } = req.body;

    const car = carQueries.findCarById(carId);
    if (!car) return erroMessage(res, 404, 'Car not found');
    const newFlag = flagQueries
        .createFlag(carId, reason, description, reportedBy);
    return res.status(201).json({
        status: 'success',
        data: newFlag
    });
};

export default flagAd;
