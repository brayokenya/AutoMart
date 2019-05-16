import users from '../models/mockDb/user';
import userQueries from '../helpers/queries';
import { generateToken } from '../middleware/jwtAuth';
import errorMessage from '../helpers/responseMessages';


export const signupUser = (req, res) => {
    const existingUser = userQueries.findUserByEmail(req.body.email);
    if (existingUser) {
        return errorMessage(res, 409, 'Email is already in use');
    }
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
        message: `Welcome, ${newUser.firstName}!`,
        data: {
            token,
            id: newUser.id,
            firstName: newUser.firstName,
            lastName,
            email: newUser.email
        }
    });
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;
    const existingUser = userQueries.findUserByEmail(email.trim());
    if (!existingUser) {
        return errorMessage(res, 404, 'Incorrect email or password');
    }

    const isUser = existingUser.password === password.trim();

    return isUser
        ? res.status(200).json({
            status: 'success',
            message: `Welcome back, ${existingUser.firstName}!`,
            data: {
                token: generateToken(existingUser.id, existingUser.email),
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        })
        : errorMessage(res, 404, 'Incorrect email or password');
};
