const bookingValidator = ({CapacityRequired,fromPinCode,toPinCode,startTime}) => {


    if (CapacityRequired === undefined) {
        const err = new Error('CapacityRequired is missing');
        err.status = 400;
        throw err;
    }
    if (typeof CapacityRequired !== 'number' || CapacityRequired <= 0) {
        const err = new Error('CapacityRequired must be a positive number');
        err.status = 400;
        throw err;
    }

    if (!fromPinCode) {
        const err = new Error('fromPinCode is missing');
        err.status = 400;
        throw err;
    }
    //For Indian address - Pin Code should be of 6 digits,
    if (!/^\d{6}$/.test(fromPinCode)) {
        const err = new Error('fromPinCode must be a 6-digit string');
        err.status = 400;
        throw err;
    }


    if (!toPinCode) {
        const err = new Error('toPinCode is missing');
        err.status = 400;
        throw err;
    }

    if (!/^\d{6}$/.test(toPinCode)) {
        const err = new Error('toPinCode must be a 6-digit string');
        err.status = 400;
        throw err;
    }

    if (!startTime) {
        const err = new Error('startTime is missing');
        err.status = 400;
        throw err;
    }
    
    const date = new Date(startTime);
    if (isNaN(date.getTime())) {
        const err = new Error('startTime must be a valid date');
        err.status = 400;
        throw err;
    }
    if (date <= new Date()) {
        const err = new Error('startTime must be in the future');
        err.status = 400;
        throw err;
    }
};

module.exports = bookingValidator;
