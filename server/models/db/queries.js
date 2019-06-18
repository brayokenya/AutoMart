import pool from '../../config/db.config';

const userQueries = {
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

export default userQueries;
