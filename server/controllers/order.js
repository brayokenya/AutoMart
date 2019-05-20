import { orderQueries, carQueries } from '../helpers/queries';
import errorMessage from '../helpers/responseMessages';

export const createOrder = (req, res) => {
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

export const updateOrder = (req, res) => {
    const { newOffer, userId: buyerId } = req.body;
    const { orderId } = req.params;
    const oldOrder = orderQueries.findOrderById(+orderId);
    if (!oldOrder || oldOrder.buyerId !== buyerId) {
        return errorMessage(res, 404, 'Purchase order not found');
    }
    const updatedOrder = orderQueries.updateOffer(+orderId, newOffer);
    return res.status(200).json({
        status: 'success',
        data: {
            ...updatedOrder,
            oldOffer: oldOrder.offer
        }
    });
};
