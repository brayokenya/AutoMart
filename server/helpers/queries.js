import users from '../models/mockDb/user';

const userQueries = {
    findUserByEmail(email) {
        return users.find(user => user.email === email);
    },
    createUser(newUserObject) {
        users.push(newUserObject);
        return users[users.length - 1];
    }
};

export default userQueries;
