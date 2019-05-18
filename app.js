import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './server/routes/user';
import carRouter from './server/routes/car';

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use('/api/v1/', userRouter, carRouter);

/* eslint-disable-next-line */
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));

export default app;
