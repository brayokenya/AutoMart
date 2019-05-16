const response422 = (res, message) => {
    res.status(422).json({
        status: 'error',
        message
    });
};

export default response422;
