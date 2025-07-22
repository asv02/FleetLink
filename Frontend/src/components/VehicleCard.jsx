import {useState} from 'react'
import { useSelector } from 'react-redux';
/*
Vehicle Name
Capacity
Tyres
Estimated Ride Duration
*/
const VehicleCard = ({ Name, Capacity, Tyres, estimateTime, vehicleId }) => {
  const [message, setMessage] = useState("");

  const availVehicles = useSelector((Store) => Store.AvailableReducer);
  console.log("Reducer available->", availVehicles);

  const startTime = availVehicles.startTime;
  const fromPincode = availVehicles.fromPincode;
  const toPincode = availVehicles.toPincode;

  const handleBook = async () => {
    try {
      const data = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          VehicleId: vehicleId,
          fromPinCode: fromPincode,
          toPinCode: toPincode,
          startTime: startTime,
          customerId: "101",
        }),
      });

      const res = await data.json();
      setMessage(res.message);
    } catch (err) {
      console.log("Somthing went Wrong in Booking.");
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card w-96 bg-white shadow-xl border border-gray-200">
        <div className="card-body space-y-3">
          <h2 className="card-title text-xl font-semibold text-gray-800">
            🚚 {Name}
          </h2>

          <ul className="text-gray-600 space-y-1">
            <li>
              <span className="font-medium">Capacity:</span> {Capacity} Kg
            </li>
            <li>
              <span className="font-medium">Tyres:</span> {Tyres}
            </li>
            <li>
              <span className="font-medium">Estimated Time:</span>{" "}
              {estimateTime} mins
            </li>
          </ul>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary w-full" onClick={handleBook}>
              Book Vehicle
            </button>
          </div>
        </div>
      </div>
      {message}
    </div>
  );
};

export default VehicleCard;
