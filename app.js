import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

/* eslint-disable-next-line */
app.listen(PORT || 3000, () => console.log(`App is running on port: ${PORT}`));

export default app;
