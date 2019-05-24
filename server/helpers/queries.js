import users from '../models/mockDb/user';
import cars from '../models/mockDb/car';
import orders from '../models/mockDb/order';
import flags from '../models/mockDb/flag';

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

    findAvailableCars(queryObject) {
        const getQueryValue = (car, query, string) => {
            if (!query) return car[string];
            return query;
        };
        const {
            min_price: minPrice = 0,
            max_price: maxPrice = Infinity,
            state,
            make: manufacturer,
            body_type: bodyType
        } = queryObject;


        const availableCars = cars.filter(car => (
            car.status === 'available'
            && car.price >= minPrice
            && car.price <= maxPrice
            && car.manufacturer === getQueryValue(car, manufacturer, 'manufacturer')
            && car.state === getQueryValue(car, state, 'state')
            && car.bodyType === getQueryValue(car, bodyType, 'bodyType')
        ));
        return availableCars;
    },
    findAllCars() {
        return cars;
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
    },

    deleteCar(carObject) {
        const carIndex = cars.indexOf(carObject);
        cars.splice(carIndex, 1);
        // returns true if car has been deleted and false if it hasn't
        return !cars.indexOf(carObject);
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
        const orderIndex = orders.indexOf(newOrderIndex);
        orders.splice(orderIndex, 1, newOrderIndex);
    }
};

export const flagQueries = {
    createFlag(carId, reason, description, reportedBy) {
        const newFlag = {
            id: flags.length,
            carId,
            reason,
            description,
            reportedBy,
            createdOn: Date()
        };

        flags.push(newFlag);
        return newFlag;
    }
};
