const express = require('express')
const Booking = require('../modal/Booking')
const Vehicle = require('../modal/Vehicle')
const Trip = require('../modal/Trip')
const bookingValidator = require('../utils/bookingValidator')
const router = express.Router()


const rideDuration = (fromPinCode, toPinCode) => {   // this is in hours
    return (Math.abs(parseInt(toPinCode) - parseInt(fromPinCode))) % 24;
}

router.get('/api/vehicles/available', async (req, res) => {
    try {

        /* capacityRequired: Number
           fromPincode: String
           toPincode: String
           startTime
        */
        console.log('query->', req.query)
        const CapacityRequired = parseInt(req.query.capacityRequired)
        const fromPinCode = (req.query.fromPincode)
        const toPinCode = req.query.toPinCode
        const startTime = req.query.startTime

        bookingValidator({ CapacityRequired, fromPinCode, toPinCode, startTime })
        const RideDuration = rideDuration(fromPinCode, toPinCode)
        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + RideDuration * 60 * 60 * 1000).toISOString();

        const availableVehicles = await Vehicle.find({ Capacity: { $gte: CapacityRequired } })

        //Condition to exactly overlap.
        const BookedVehicle = await Booking.find({
            startTime: { $lt: endDate },
            endTime: { $gt: startDate }
        }).distinct("VehicleId");

        console.log("availableVehicales->", availableVehicles);
        console.log("BookedVehicle->", BookedVehicle);

        const delieveryVehicles = availableVehicles.filter((veh) => {
            return !BookedVehicle.includes(veh._id.toString());
        })
        res.status(200).json({ message: "Successfully fetched Available Vehicle", availableVehicles: delieveryVehicles, estimatedTime: RideDuration })
    }
    catch (err) {
        console.log(`Error in booking vehicle....${err.message}`)
    }
})

router.post('/api/bookings', async (req, res) => {
    try {
        const { VehicleId, fromPinCode, toPinCode, startTime, customerId } = req.body;

        const tempVeh = Vehicle.findOne({ _id: VehicleId })
        if (!tempVeh) {
            res.status(404).json({ message: "Not Found vehicle ID" })
        }

        const estimateTime = rideDuration(fromPinCode, toPinCode)
        const bookingEndTime = new Date(new Date(startTime).getTime() + estimateTime * 60 * 60 * 1000).toISOString();

        const ifBooked = await Booking.find({
            $and: [{ VehicleId: VehicleId }, { startTime: { $lt: bookingEndTime } },
            { endTime: { $gt: startTime } }]
        })

        console.log('ifBooked->',ifBooked)

        if (ifBooked.length>0) {
            return res.status(409).json({ message: "Vehicle with given Id is already Booked" });
        }

        const NewBooking = new Booking(
            {
                VehicleId, startTime, endTime: bookingEndTime, fromPinCode, toPinCode
            })
        const saveBooking = await NewBooking.save()

        const newTrip = new Trip(
            {
                customerId, bookingId: saveBooking._id
            })
        const saveTrip = await newTrip.save()
        res.status(201).json({ message: "Vehicle Booked successfully...", vehicleId: VehicleId, trip: saveTrip })
    }
    catch (err) {
        console.log(`Something went wrong during booking, ${err.message}`)
    }
})

module.exports = router;