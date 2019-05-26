const stringFormater = (req, res, next) => {
    const stringKeys = Object.keys(req.body);
    stringKeys.forEach(key => {
        if (typeof (req.body[key]) === 'string') {
            req.body[key] = req.body[key].trim();
            console.log(req.body[key]);
        }
    });
    return next();
};

export default stringFormater;
