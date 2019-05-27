import express from 'express';
import dotenv from 'dotenv';
import stringFormater from './server/middleware/stringFormater';
import userRouter from './server/routes/user';
import carRouter from './server/routes/car';
import orderRouter from './server/routes/order';
import flagRouter from './server/routes/flag';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(stringFormater);

app.use('/api/v1/', userRouter, carRouter, orderRouter, flagRouter);

app.all('/*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'page not found'
    });
});

/* eslint-disable-next-line */
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'oops! something went wrong'
    });
});

const { PORT } = process.env;
/* eslint-disable-next-line */
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));

export default app;
