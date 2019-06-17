import pool from '../../config/db.config';

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password_hash VARCHAR(150) NOT NULL,
    address VARCHAR(120) NOT NULL,
    is_admin BOOLEAN DEFAULT false
);
`;

const carsTable = `
DROP TABLE IF EXISTS cars CASCADE;
CREATE TABLE cars (
    car_id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(user_id) NOT NULL,
    state VARCHAR(7) NOT NULL,
    status VARCHAR(12) DEFAULT 'available',
    price FLOAT NOT NULL,
    manufacturer VARCHAR(30) NOT NULL,
    model VARCHAR(30) NOT NULL,
    body_type VARCHAR(25) NOT NULL,
    image_url VARCHAR(200) NOT NULL,
    crated_on DATE DEFAULT NOW()
);
`;

const ordersTable = `
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    order_id SERIAL,
    buyer_id INTEGER REFERENCES users(user_id) NOT NULL,
    car_id INTEGER REFERENCES cars(car_id) NOT NULL,
    offer INTEGER NOT NULL,
    price INTEGER NOT NULL,
    status VARCHAR(10) DEFAULT 'pending',
    created_on DATE DEFAULT NOW()
);
`;

const flagsTable = `
DROP TABLE IF EXISTS flags;
CREATE TABLE flags (
    flag_id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES cars(car_id),
    reason VARCHAR(110) NOT NULL,
    description TEXT,
    reported_by INTEGER REFERENCES users(user_id) NOT NULL,
    created_on DATE DEFAULT NOW()
);
`;

const queryString = `
${usersTable}
${carsTable}
${ordersTable}
${flagsTable}
`;

(async () => {
    try {
        await pool.query(queryString);
    } catch (error) {
        /* eslint-disable-next-line */
        if (error) console.log(error);
    }
})();
