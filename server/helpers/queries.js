import users from '../models/mockDb/user';
import cars from '../models/mockDb/car';
import orders from '../models/mockDb/order';

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
    },
    findCarById(id) {
        const foundCar = cars.find(car => car.id === id);
        return foundCar;
    }
};

export const orderQueries = {
    createOrder(orderObject) {
        const newOrder = {
            id: orders.length,
            ...orderObject
        };
        orders.push(newOrder);
        return newOrder;
    },

    findOrderById(orderId) {
        const foundOrder = orders.find(order => order.id === orderId);
        return foundOrder;
    },

    updateOffer(orderId, newOffer) {
        const order = this.findOrderById(orderId);
        order.offer = newOffer;
        order.updatedOn = Date();
        return order;
    }
};
