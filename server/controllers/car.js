import { carQueries } from '../models/db/queries';
import errorMessage from '../helpers/responseMessages';

export const postCarAd = async (req, res) => {
    const {
        userId: owner,
        price,
        state,
        manufacturer,
        model,
        bodyType,
        imageUrl
    } = req.body;

    try {
        const newCar = await carQueries.createCar(
            owner,
            state,
            price,
            manufacturer,
            model,
            bodyType,
            imageUrl
        );

        return res.status(201).json({
            status: 'success',
            data: newCar
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! somwthingssssss went wrong');
    }
};

export const updateStatus = async (req, res) => {
    const { userId } = req.body;
    const { carId } = req.params;
    try {
        const car = await carQueries.findCarById(carId);
        if (!car || car.owner !== userId) {
            return errorMessage(res, 404, 'car not found');
        }
        const updatedCar = await carQueries.markAsSold(carId);
        return res.status(200).json({
            status: 'success',
            data: updatedCar
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! somwthingssssss went wrong');
    }
};
