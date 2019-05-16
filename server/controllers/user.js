import users from '../models/mockDb/user';
import userQueries from '../helpers/queries';
import { generateToken } from '../middleware/jwtAuth';
import errorMessage from '../helpers/responseMessages';


const signupUser = (req, res) => {
    const existingUser = userQueries.findUserByEmail(req.body.email);
    if (existingUser) return errorMessage(res, 409, 'Email is already in use');
    const {
        firstName,
        lastName,
        email,
        password,
        address
    } = req.body;

    const newUser = userQueries.createUser(
        {
            id: users.length,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            address: address.trim(),
            password: password.trim(),
            isAdmin: false
        }
    );
    const token = generateToken(newUser.id, newUser.email);

    return res.status(201).json({
        status: 'success',
        data: {
            token,
            id: newUser.id,
            firstName: newUser.firstName,
            lastName,
            email: newUser.email
        },
        message: `Welcome, ${newUser.firstName}!`
    });
};

export default signupUser;
