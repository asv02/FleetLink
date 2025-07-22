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
            type: Date,
            required: true,
        },
        endTime:
        {
            type: Date,
            required: true,
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