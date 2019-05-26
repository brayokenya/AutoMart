const stringFormater = (req, res, next) => {
    // Get all values from req.body that are strings
    // trim the strings
    // replace the original values with the trimmed values

    const stringKeys = Object.keys(req.body);
    stringKeys.forEach(key => {
        if (typeof (req.body[key] === 'string')) {
            req.body[key] = req.body[key].trim();
        }
    });
    return next();
};

export default stringFormater;
