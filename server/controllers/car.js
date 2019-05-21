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

const validateOwnership = (carId, userId) => {
    const car = carQueries.findCarById(carId);
    return (!car || car.owner !== userId)
        ? false
        : car;
};

export const updateStatus = (req, res) => {
    const { carId, userId } = req.body;
    const car = validateOwnership(carId, userId);
    if (!car) return errorMessage(res, 404, 'Car not found');
    const updatedCar = carQueries
        .updateProp(carId, 'status', 'sold');
    return res.status(200).json({
        status: 'success',
        data: updatedCar
    });
};

export const updatePrice = (req, res) => {
    const { carId, userId, price: newPrice } = req.body;
    const car = validateOwnership(carId, userId);
    if (!car) return errorMessage(res, 404, 'Car not found');

    const updatedCar = carQueries.updateProp(carId, 'price', newPrice);
    return res.status(200).json({
        status: 'success',
        data: updatedCar
    });
};

export const getSpecificCar = (req, res) => {
    const { carId } = req.body;
    const car = carQueries.findCarById(carId);
    return !car
        ? errorMessage(res, 404, 'Car not found')
        : res.status(200).json({
            status: 'success',
            data: car
        });
};

export const getAvailableCars = (req, res) => {
    const { status } = req.query;
    if (status !== 'available') return errorMessage(res, 404, 'Cars not found');
    const cars = carQueries.findAvailableCars();
    return res.status(200).json({
        status: 'success',
        data: cars
    });
};
