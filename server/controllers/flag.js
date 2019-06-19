import { createFlag, carQueries } from '../models/db/queries';
import errorMessage from '../helpers/responseMessages';

const flagAd = async (req, res) => {
    const {
        carId,
        reason,
        description,
        userId: reportedBy
    } = req.body;
    try {
        const car = await carQueries.findCarById(carId);
        if (!car) return errorMessage(res, 404, 'car not found');
        const newFlag = await createFlag(carId, reason, description, reportedBy);
        return res.status(201).json({
            status: 'success',
            data: newFlag
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong');
    }
};

export default flagAd;
