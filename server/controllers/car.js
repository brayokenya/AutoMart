import { carQueries } from '../helpers/queries';
import errorMessage from '../helpers/responseMessages';

export const postCarAd = (req, res) => {
    const {
        manufacturer,
        price,
        state,
        model,
        bodyType,
        userId: owner,
        status = 'available',
        imageUrl,
        createdOn = Date()
    } = req.body;

    const newCar = carQueries.createCar(
        {
            manufacturer,
            price,
            state,
            model,
            bodyType,
            owner,
            status,
            imageUrl,
            createdOn
        }
    );

    return res.status(201).json({
        status: 'success',
        data: newCar
    });
};

export const updateStatus = (req, res) => {
    const { carId, userId } = req.body;
    const car = carQueries.findCarById(carId);
    if (!car || car.owner !== userId) {
        return errorMessage(res, 404, 'Car not found');
    }
    const updatedCar = carQueries
        .updateProp(carId, 'status', 'sold');
    return res.status(200).json({
        status: 'success',
        data: updatedCar
    });
};
