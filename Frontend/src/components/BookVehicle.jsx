import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { useSelector } from "react-redux";

const BookVehicle = () => {
  const [vehicles, setVehicles] = useState([]);

  const availVehicles = useSelector((Store) => Store.AvailableReducer);
  console.log("Reducer available->", availVehicles);

  const startTime = availVehicles.startTime
  const fromPincode = availVehicles.fromPincode
  const toPincode = availVehicles.toPincode 

  useEffect(() => {
    setVehicles(availVehicles?.vehicle?.availableVehicles || []);
  }, [availVehicles]);

  return (
    <div className="min-h-screen bg-base-300 p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Available Vehicles
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {vehicles.map((veh, ind) => (
          <VehicleCard
            key={ind}
            Name={veh.Name}
            Capacity={veh.Capacity}
            Tyres={veh.Tyres}
            estimateTime={availVehicles?.vehicle?.estimatedTime}
            vehicleId={veh._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BookVehicle;
