import pool from '../../config/db.config';

export const userQueries = {
    async findUserByEmail(userEmail) {
        const queryString = {
            text: 'SELECT * FROm users WHERE email=$1;',
            values: [userEmail]
        };
        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async createUser(firstName, lastName, email, passwordHash, address) {
        const queryString = {
            text: `INSERT INTO users
                (first_name, last_name, email, password_hash, address)
                VALUES($1, $2, $3, $4, $5)
                RETURNING user_id, first_name, last_name, email;`,
            values: [firstName, lastName, email, passwordHash, address]
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    }
};

export const carQueries = {
    async createCar(owner, state, price, manufacturer, model, bodyType, imageUrl) {
        const queryString = {
            text: `INSERT INTO cars
            (owner, state, price, manufacturer, model, body_type, image_url)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`,
            values: [owner, state, price, manufacturer, model, bodyType, imageUrl]
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async findCarById(carId) {
        const queryString = {
            text: 'SELECT * FROM cars WHERE car_id=$1;',
            values: [carId]
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async markAsSold(carId, owner) {
        const queryString = {
            text: ` UPDATE cars SET status = $3
                    WHERE car_id = $1 AND owner = $2
                    RETURNING * ;`,
            values: [carId, owner, 'sold']
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async updatePrice(carId, owner, price) {
        const queryString = {
            text: `UPDATE cars SET price = $3
                WHERE car_id = $1 AND owner=$2
                RETURNING *;`,
            values: [carId, owner, price]
        };
        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async findAvailableCars(min, max, state, bodyType, make) {
        const queryString = {
            text: `SELECT * FROM cars
                WHERE status=$1 AND (price BETWEEN $2 AND $3) 
                AND state ILIKE $4 AND
                body_type ILIKE $5 AND manufacturer ILIKE $6;`,
            values: ['available', min, max, state, bodyType, make]
        };
        const { rows } = await pool.query(queryString);
        return rows;
    },

    async findAllCars() {
        const queryString = 'SELECT * FROM cars;';
        const { rows } = await pool.query(queryString);
        return rows;
    },

    async deleteCar(carId) {
        const queryString = {
            text: 'DELETE FROM cars WHERE car_id=$1;',
            values: [carId]
        };
        await pool.query(queryString);
    }
};


export const orderQueries = {
    async createOrder(buyerId, carId, offer, price) {
        const queryString = {
            text: `INSERT INTO orders 
            (buyer_id, car_id, offer, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`,
            values: [buyerId, carId, offer, price]
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async findOrderById(orderId) {
        const queryString = {
            text: 'SELECT * FROM orders WHERE order_id=$1;',
            values: [orderId]
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    },

    async updateOffer(orderId, newOffer) {
        const queryString = {
            text: ` UPDATE orders SET offer = $2
                    WHERE order_id  = $1
                    RETURNING * ;`,
            values: [orderId, newOffer]
        };

        const { rows } = await pool.query(queryString);
        return rows[0];
    }
};


export const createFlag = async (carId, reason, description, reportedBy) => {
    const queryString = {
        text: `INSERT INTO flags
            (car_id, reason, description, reported_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`,
        values: [carId, reason, description, reportedBy]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
};
