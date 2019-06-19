import { carQueries } from '../models/db/queries';
import { getUserFromToken } from '../middleware/jwtAuth';
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
        return errorMessage(res, 500, 'oops! something went wrong');
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
        const updatedCar = await carQueries.markAsSold(carId, car.owner);
        return res.status(200).json({
            status: 'success',
            data: updatedCar
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong went wrong');
    }
};


export const updatePrice = async (req, res) => {
    const { userId: owner, newPrice } = req.body;
    const { carId } = req.params;
    try {
        const updatedCar = await carQueries
            .updatePrice(carId, owner, newPrice);
        return updatedCar
            ? res.status(200).json({
                status: 'success',
                data: updatedCar
            })
            : errorMessage(res, 404, 'car not found');
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong went wrong');
    }
};


export const getSpecificCar = async (req, res) => {
    const { carId } = req.params;
    try {
        const car = await carQueries.findCarById(carId);
        return !car
            ? errorMessage(res, 404, 'car not found')
            : res.status(200).json({
                status: 'success',
                data: car
            });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong went wrong');
    }
};

export const getAvailableCars = async (req, res) => {
    const {
        status,
        min_price: min = 0,
        max_price: max = 2147483647,
        state = '%',
        body_type: bodyType = '%',
        make = '%'
    } = req.query;
    const isInvalidStatus = (status !== 'available');
    if (isInvalidStatus) return errorMessage(res, 403, 'you do not have access to this resource');
    try {
        const cars = await carQueries
            .findAvailableCars(min, max, state, bodyType, make);
        return cars.length
            ? res.status(200).json({
                status: 'success',
                data: cars
            })
            : res.status(404).json({
                status: 'error',
                message: 'we could not find any car that matches your search'
            });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong went wrong');
    }
};

const getAllCars = async (res) => {
    const cars = await carQueries.findAllCars();
    return res.status(200).json({
        status: 'success',
        data: cars
    });
};

export const getCars = async (req, res) => {
    const { is_admin: isAdmin } = await getUserFromToken(req.headers.authorization);
    return isAdmin
        ? getAllCars(res)
        : getAvailableCars(req, res);
};


export const deleteAd = async (req, res) => {
    const { carId } = req.params;
    const { is_admin: isAdmin } = await getUserFromToken(req.headers.authorization);
    if (!isAdmin) return errorMessage(res, 403, 'you do not have access to this resource');
    try {
        const car = await carQueries.findCarById(carId);
        if (!car) return errorMessage(res, 404, 'car not found');
        await carQueries.deleteCar(carId);
        return res.status(200).json({
            status: 'success',
            message: 'car ad was successfully deleted'
        });
    } catch (error) {
        return errorMessage(res, 500, 'oops! something went wrong went wrong');
    }
};
