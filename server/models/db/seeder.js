import pool from '../../config/db.config';
import users from '../mockDb/user';
import cars from '../mockDb/car';
import orders from '../mockDb/order';
import flags from '../mockDb/flag';
import getValues from '../../helpers/sqlValuesGetter';


// User seeder
const userValues = getValues(users);
const userSeeder = `
INSERT INTO users
(first_name, last_name, email, password_hash, address, is_admin)
VALUES ${userValues}
;`;

// Car seeder
const carValues = getValues(cars);
const carSeeder = `
INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
VALUES ${carValues}
;`;

// Order seeder
const orderValues = getValues(orders);
const orderSeeder = `
INSERT INTO orders (buyer_id, car_id, offer, price, status)
VALUES ${orderValues}
;`;


// Flag seeder
const flagValues = getValues(flags);
const flagSeeder = `
INSERT INTO flags (car_id, reason, description, reported_by)
VALUES ${flagValues}
;`;

const queryString = `
    ${userSeeder}
    ${carSeeder}
    ${orderSeeder}
    ${flagSeeder}
`;


(async () => {
    try {
        await pool.query(queryString);
    } catch (error) {
        /* eslint-disable-next-line */
        console.log(error);
    }
})();
