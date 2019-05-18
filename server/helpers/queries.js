import users from '../models/mockDb/user';
import cars from '../models/mockDb/car';

export const userQueries = {
    findUserByEmail(email) {
        return users.find(user => user.email === email);
    },
    createUser(userObject) {
        const newUserObject = {
            id: users.length,
            ...userObject,
            isAdmin: false
        };
        users.push(newUserObject);
        return newUserObject;
    }
};


export const carQueries = {
    createCar(carObject) {
        const newCar = {
            id: cars.length,
            ...carObject
        };
        cars.push(newCar);
        return newCar;
    }
};
