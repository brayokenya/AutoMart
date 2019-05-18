import { carQueries } from '../helpers/queries';

const postCarAd = (req, res) => {
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

export default postCarAd;
