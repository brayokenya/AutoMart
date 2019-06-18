import { orderQueries, carQueries } from '../models/db/queries';
import errorMessage from '../helpers/responseMessages';

const createOrder = async (req, res) => {
    const { carId, offer, userId: buyer } = req.body;
    try {
        const car = await carQueries.findCarById(carId);
        if (!car) return errorMessage(res, 404, 'Car does not exist');
        const newOrder = await orderQueries.createOrder(
            buyer,
            carId,
            offer,
            car.price
        );
        return res.status(201).json({
            status: 'success',
            data: newOrder
        });
    } catch (error) {
        errorMessage(res, 500, 'oops! something went wrong');
    }

};

export default createOrder;