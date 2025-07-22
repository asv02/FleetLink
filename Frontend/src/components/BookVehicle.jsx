import React from 'react';
import { useSelector } from 'react-redux';
import VehicleCard from './VehicleCard';

const BookVehicle = () => {
  const { availableVehicles,estimatedTime } = useSelector((store) => store.AvailableReducer);
  

  console.log('availableVehicles->',availableVehicles)
  
  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Available Vehicles</h2>
      {availableVehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles available.</p>
      ) : (
        availableVehicles.map((veh) => (
          <VehicleCard
            key={veh._id}
            vehicleId={veh._id}
            Name={veh.Name}
            Capacity={veh.Capacity}
            Tyres={veh.Tyres}
            estimateTime={estimatedTime}
          />
        ))
      )}
    </div>
  );
};

export default BookVehicle;
