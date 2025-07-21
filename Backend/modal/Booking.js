const mongoose = require('mongoose');
const validator = require('validator')

const BookingSchema = new mongoose.Schema(
    {
        VehicleId:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Vehicle'
        },
        startTime:
        {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isISO8601(value)) {
                    throw new Error('Date is not valid');
                }
            }
        },
        endTime:
        {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isISO8601(value)) {
                    throw new Error('Date is not valid');
                }
            }
        },
        fromPinCode:
        {
            type: String,
            required: true,
        },
        toPinCode:
        {

            type: String,
            required: true,
        }
    })


module.exports = mongoose.model('Booking',BookingSchema)