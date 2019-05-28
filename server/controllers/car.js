import { carQueries } from '../helpers/queries';
import errorMessage from '../helpers/responseMessages';
import { getUserFromToken } from '../middleware/jwtAuth';

export const postCarAd = (req, res) => {
    const {
        manufacturer,
        price,
        state,
        model,
        bodyType,
        userId: owner,
        imageUrl
    } = req.body;

    const newCar = carQueries.createCar(
        {
            manufacturer,
            price,
            state,
            model,
            bodyType,
            owner,
            imageUrl,
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
    const { carId } = req.params;
    const { userId } = req.body;
    const car = validateOwnership(carId, userId);
    if (!car) return errorMessage(res, 404, 'car not found');
    const updatedCar = carQueries.updateProp(carId, 'status', 'sold');
    return res.status(200).json({
        status: 'success',
        data: updatedCar
    });
};

export const updatePrice = (req, res) => {
    const { userId, newPrice } = req.body;
    const { carId } = req.params;
    const car = validateOwnership(carId, userId);
    if (!car) return errorMessage(res, 404, 'car not found');

    const updatedCar = carQueries.updateProp(carId, 'price', newPrice);
    return res.status(200).json({
        status: 'success',
        data: updatedCar
    });
};

export const getSpecificCar = (req, res) => {
    const { carId } = req.params;
    const car = carQueries.findCarById(carId);
    return !car
        ? errorMessage(res, 404, 'car not found')
        : res.status(200).json({
            status: 'success',
            data: car
        });
};

const getAllCars = (res) => {
    const cars = carQueries.findAllCars();
    return res.status(200).json({
        status: 'success',
        data: cars
    });
};


const getAvailableCars = (req, res) => {
    const { status } = req.query;
    const isInvalidStatus = (status !== 'available');
    if (isInvalidStatus) return errorMessage(res, 403, 'you do not have access to this resource');
    const cars = carQueries.findAvailableCars(req.query);
    return cars.length > 0
        ? res.status(200).json({
            status: 'success',
            data: cars
        })
        : res.status(404).json({
            status: 'error',
            message: 'we could not find any car that matches your search'
        });
};

export const getCar = (req, res) => {
    const { isAdmin } = getUserFromToken(req.headers.authorization);
    return isAdmin
        ? getAllCars(res)
        : getAvailableCars(req, res);
};

export const deleteAd = (req, res) => {
    const { carId } = req.params;
    const { isAdmin } = getUserFromToken(req.headers.authorization);
    if (!isAdmin) return errorMessage(res, 403, 'you do not have access to this resource');
    const car = carQueries.findCarById(carId);
    if (!car) return errorMessage(res, 404, 'car not found');
    carQueries.deleteCar(car);
    return res.status(200).json({
        status: 'success',
        message: 'car ad was successfully deleted'
    });
};
