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
    },

    updateProp(carId, property, value) {
        const car = this.findCarById(carId);
        car[property] = value;
        this.updateEntity(car);
        return car;
    },

    updateEntity(newCarObject) {
        const carIndex = cars.indexOf(newCarObject);
        cars.splice(carIndex, 1, newCarObject);
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
        this.updateEntity(order);
        return order;
    },

    updateEntity(newOrderIndex) {
        const orderIndex = cars.indexOf(newOrderIndex);
        cars.splice(orderIndex, 1, newOrderIndex);
    }
};
