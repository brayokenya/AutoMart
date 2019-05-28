export const isNotSpecified = (value, key) => (!value
    ? `${key} was not specified`
    : false);

export const pureNumber = {
    isInvalid(value, key) {
        return !(+value)
            ? `invalid ${key}`
            : false;
    }
};

export const money = {
    isInvalid(value, key) {
        return pureNumber.isInvalid(value, key);
    },

    invalidDecimalPlaces(value, key) {
        // checks if the digits after the decimal point are more than 2
        // using >3 because I am counting the '.' (period)
        // returns true if it is longet than 2 and false if not
        const notValid = (value.toString().length
            - value.toString().split('.')[0].length) > 3;

        return notValid
            ? `${key} has more than two decimal places`
            : false;
    },

    isTooHigh(value, key, digits) {
        // checks if values before the decimal point is higher than the given length
        const isHigh = value.toString()
            .split('.')[0].length > digits;
        return isHigh
            ? `whoa! that ${key} is quite high`
            : false;
    },

    doValidation(value, key, maxDigits) {
        const messages = isNotSpecified(value)
            || this.isInvalid(value, key)
            || this.invalidDecimalPlaces(value, key)
            || this.isTooHigh(value, key, maxDigits);
        return messages;
    }
};


export const pureString = {
    isInvalid(value, key) {
        const hasInvaliidCharacters = value.match(/[^a-z\s]/i);
        return hasInvaliidCharacters
            ? `${key} has invalid characters`
            : false;
    },

    isTooLong(value, key, length) {
        const tooLong = value.length > length;
        return tooLong
            ? `${key} exceeds the maximum length of ${length}`
            : false;
    },

    isNotAlphaNumeric(value, key) {
        const hasInvalidCharacters = value.match(/[^a-z0-9\s.]/i);
        return hasInvalidCharacters
            ? `${key} has invalid characters`
            : false;
    }
};
