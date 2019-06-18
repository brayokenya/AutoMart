import { carQueries } from '../models/db/queries';
import errorMessage from '../helpers/responseMessages';

const postCarAd = async (req, res) => {
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

export default postCarAd;
