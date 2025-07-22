import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBookedVehicle } from '../../Utils/AppSlice';

const VehicleCard = ({ Name, Capacity, Tyres, estimateTime, vehicleId }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { startTime, fromPincode, toPincode } = useSelector(
    (store) => store.AvailableReducer
  );

  const handleBook = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          VehicleId: vehicleId,
          fromPinCode: fromPincode,
          toPinCode: toPincode,
          startTime: startTime,
          customerId: "101",
        }),
      });

      const res = await response.json();
      setMessage(`success:${res.message}`);
      alert("Successfully Booked the Vehicle...")

      if (res.message.toLowerCase().includes("success")) {
        dispatch(removeBookedVehicle(vehicleId));
      }

    } catch (err) {
      console.log("Error during booking:", err);
      setMessage(`Failed:Booking failed`);
      alert("Failed to Book the Vehicle...")
    }
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <div className="card w-96 bg-white shadow-xl border border-gray-200">
          <div className="card-body space-y-3">
            <h2 className="card-title text-xl font-semibold text-gray-800">
              {Name}
            </h2>
            <ul className="text-gray-600 space-y-1">
              <li><span className="font-medium">Capacity:</span> {Capacity} Kg</li>
              <li><span className="font-medium">Tyres:</span> {Tyres}</li>
              <li><span className="font-medium">Estimated Time:</span> {estimateTime} hrs.</li>
            </ul>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary w-full" onClick={handleBook}>
                Book Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleCard;
