import path from 'path';
import express from 'express';
import appVariables from './server/config/app.config';
import stringFormater from './server/middleware/stringFormater';
import userRouter from './server/routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(stringFormater);

app.get('/', (req, res) => {
    res.status(301).redirect('/docs');
});

app.get('/docs', (req, res) => {
    res.status(200)
        .sendFile(path.resolve('documentation.html'));
});

app.use('/api/v2/', userRouter);

app.all('/*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'this api endpoint does not exist'
    });
});

/* eslint-disable-next-line */
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'oops! something went wrong'
    });
});


const { port } = appVariables;
/* eslint-disable-next-line */
app.listen(port, () => console.log(`App is running on port: ${port}`));

export default app;
