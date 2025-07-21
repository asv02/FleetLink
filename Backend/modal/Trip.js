const mongoose = require('mongoose')
const validator = require("validator");

const TripSchema = new mongoose.Schema(
    {
        customerId:
        {
            //Just for demo type is String.
            type: String,
            required: true,
        },
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Booking'
        }
    }, { timestamps: true })

module.exports = mongoose.model('Trip', TripSchema)