const vehicleValidator = ({Name, Capacity, Tyres}) => {

    if (!Name) {
        const err = new Error('Name is missing');
        err.status = 400;
        throw err;
    }
    if (typeof Name !== 'string') {
        const err = new Error('Name must be a string');
        err.status = 400;
        throw err;
    }
    if (Name.length > 50) {
        const err = new Error('Name cannot be longer than 50 characters');
        err.status = 400;
        throw err;
    }

    if (Capacity === undefined) {
        const err = new Error('Capacity is missing');
        err.status = 400;
        throw err;
    }
    if (typeof Capacity !== 'number') {
        const err = new Error('Capacity must be a number');
        err.status = 400;
        throw err;
    }

    if (Tyres === undefined) {
        const err = new Error('Tyres is missing');
        err.status = 400;
        throw err;
    }
    if (typeof Tyres !== 'number') {
        const err = new Error('Tyres must be a number');
        err.status = 400;
        throw err;
    }
};

module.exports = vehicleValidator;