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

const isInvalidMinAndMaxPrices = (minPrice, maxPrice) => {
    if (isNaN(+minPrice)) return 'Invalid minimum price';
    if (isNaN(+maxPrice)) return 'Invalid maximum price';
    return false;
};

const getAllCars = (res) => {
    const cars = carQueries.findAllCars();
    return res.status(200).json({
        status: 'success',
        data: cars
    });
};


const getAvailableCars = (req, res) => {
    const { status, min_price: minPrice = 0, max_price: maxPrice = Infinity } = req.query;
    const invalidityMsg = isInvalidMinAndMaxPrices(minPrice, maxPrice);

    if (invalidityMsg) return errorMessage(res, 422, invalidityMsg);
    if (!status) return errorMessage(res, 403, 'You do not have access to this resource');
    if (status !== 'available') return errorMessage(res, 404, 'Cars not found');

    const cars = carQueries.findAvailableCars(minPrice, maxPrice);
    return res.status(200).json({
        status: 'success',
        data: cars
    });
};

export const getCar = (req, res) => {
    const { isAdmin } = getUserFromToken(req.headers.authorization);
    if (isAdmin) return getAllCars(res);
    return getAvailableCars(req, res);
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
