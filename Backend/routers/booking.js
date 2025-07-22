const express = require("express");
const Booking = require("../modal/Booking");
const Vehicle = require("../modal/Vehicle");
const Trip = require("../modal/Trip");
const bookingValidator = require("../utils/bookingValidator");
const router = express.Router();

const rideDuration = (fromPinCode, toPinCode) => {
  return Math.abs(parseInt(toPinCode) - parseInt(fromPinCode)) % 24;
};

router.get("/api/vehicles/available", async (req, res) => {
  try {
    const CapacityRequired = parseInt(req.query.capacityRequired);
    const fromPinCode = req.query.fromPincode;
    const toPinCode = req.query.toPinCode;
    const startTime = req.query.startTime;

    if (!startTime || isNaN(new Date(startTime).getTime())) {
      return res.status(400).json({ message: "Invalid startTime format" });
    }

    bookingValidator({ CapacityRequired, fromPinCode, toPinCode, startTime });

    const RideDuration = rideDuration(fromPinCode, toPinCode);
    const startDate = new Date(startTime);
    const endDate = new Date(
      startDate.getTime() + RideDuration * 60 * 60 * 1000
    );

    const availableVehicles = await Vehicle.find({
      Capacity: { $gte: CapacityRequired },
    });
    if (availableVehicles.length === 0) {
      return res.status(200).json({ message: "No Vehicles Available" });
    }

    const BookedVehicleIds = await Booking.find({
      startTime: { $lt: endDate },
      endTime: { $gt: startDate },
    }).distinct("VehicleId");

    const bookedIdSet = new Set(BookedVehicleIds.map((id) => id.toString()));

    const deliveryVehicles = availableVehicles.filter(
      (veh) => !bookedIdSet.has(veh._id.toString())
    );
    console.log("availableVehicles->", availableVehicles);
    console.log("BookedVehicle->", BookedVehicleIds);
    console.log("deliveryVehicles->", deliveryVehicles);

    res.status(200).json({
      message: "Successfully fetched Available Vehicle",
      availableVehicles: deliveryVehicles,
      estimatedTime: RideDuration,
    });
  } catch (err) {
    console.error(`Error in fetching available vehicle: ${err.message}`);
    res
      .status(500)
      .json({ message: "Server error while fetching availability." });
  }
});

router.post("/api/bookings", async (req, res) => {
  try {
    const { VehicleId, fromPinCode, toPinCode, startTime, customerId } =
      req.body;

    const tempVeh = await Vehicle.findOne({ _id: VehicleId });
    if (!tempVeh) {
      return res.status(404).json({ message: "Vehicle ID not found" });
    }

    const estimateTime = rideDuration(fromPinCode, toPinCode);
    const bookingEndTime = new Date(
      new Date(startTime).getTime() + estimateTime * 60 * 60 * 1000
    );

    const ifBooked = await Booking.find({
      VehicleId: VehicleId,
      startTime: { $lt: bookingEndTime },
      endTime: { $gt: new Date(startTime) },
    });

    if (ifBooked.length > 0) {
      return res
        .status(409)
        .json({ message: "Vehicle is already booked for the given time" });
    }

    const NewBooking = new Booking({
      VehicleId,
      startTime,
      endTime: bookingEndTime,
      fromPinCode,
      toPinCode,
    });

    const saveBooking = await NewBooking.save();

    const newTrip = new Trip({
      customerId,
      bookingId: saveBooking._id,
    });

    const saveTrip = await newTrip.save();

    res.status(201).json({
      message: "Vehicle booked successfully",
      vehicleId: VehicleId,
      trip: saveTrip,
    });
  } catch (err) {
    console.error(`Booking error: ${err.message}`);
    res.status(500).json({ message: "Error while booking vehicle" });
  }
});

// /////***I have taken id as CustomerId and will be harcoding to 101 in NavBar dropDown***/////
router.get("/api/bookings/:id", async (req, res) => {
  try {
    const customerId = req.params.id;

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }
    const trips = await Trip.find({ customerId })
      .populate({
        path: "bookingId",
        populate: {
          path: "VehicleId", 
        },
      });

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No bookings found for this customer" });
    }

    const enrichedTrips = trips.map((trip) => ({
      _id: trip._id,
      booking: trip.bookingId,
    }));

    res.status(200).json({ bookings: enrichedTrips });

  } catch (error) {
    console.error(`Error fetching bookings for customer ${req.params.id}:`, error.message);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
});

router.delete("/api/bookings/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Trip.deleteOne({ bookingId });
    await Booking.deleteOne({ _id: bookingId });

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(`Error cancelling booking:`, error.message);
    res.status(500).json({ message: "Server error while cancelling booking" });
  }
});


module.exports = router;
