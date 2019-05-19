import { orderQueries, carQueries } from '../helpers/queries';
import errorMessage from '../helpers/responseMessages';

const createOrder = (req, res) => {
    const { carId, offer, userId: buyer } = req.body;
    const car = carQueries.findCarById(carId);
    if (!car) return errorMessage(res, 404, 'Car does not exist');
    const newOrder = orderQueries.createOrder({
        carId,
        status: 'pending',
        price: car.price,
        offer,
        buyer,
        createdOn: Date()
    });
    return res.status(201).json({
        status: 'success',
        data: newOrder
    });
};

export default createOrder;
