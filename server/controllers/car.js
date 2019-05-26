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
    const { carId, userId } = req.body;
    const car = validateOwnership(carId, userId);
    if (!car) return errorMessage(res, 404, 'Car not found');
    const updatedCar = carQueries.updateProp(carId, 'status', 'sold');
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

const isInvalidQueryString = (req) => {
    const values = [
        'status',
        'min_price',
        'max_price',
        'state',
        'body_type',
        'make',
        ...Object.keys(req.query)
    ];
    // size will be greater than 5 if an unrecongnised query is entered
    const querySet = new Set(values);
    const isInvalid = querySet.size > 6;
    return isInvalid;
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
    const isInvalidStatus = status !== 'available';
    if (isInvalidStatus) return errorMessage(res, 403, 'You do not have access to this resource');
    if (isInvalidQueryString(req)) return errorMessage(res, 422, 'Invalid query');
    const cars = carQueries.findAvailableCars(req.query);
    return cars.length > 0
        ? res.status(200).json({
            status: 'success',
            data: cars
        })
        : res.status(404).json({
            status: 'error',
            message: 'We could not find any car that matches your search'
        });
};

export const getCar = (req, res) => {
    const { isAdmin } = getUserFromToken(req.headers.authorization);
    return isAdmin
        ? getAllCars(res)
        : getAvailableCars(req, res);
};

export const deleteAd = (req, res) => {
    const { carId } = req.body;
    const { isAdmin } = getUserFromToken(req.headers.authorization);
    if (!isAdmin) return errorMessage(res, 403, 'You do not have access to this resource');
    const car = carQueries.findCarById(carId);
    if (!car) return errorMessage(res, 404, 'Car not found');
    carQueries.deleteCar(car);
    return res.status(200).json({
        status: 'success',
        message: 'Car Ad successfully deleted'
    });
};
