import { createSlice } from '@reduxjs/toolkit';

const AvailableSlice = createSlice({
  name: "AvailableVehicle",
  initialState: {
    availableVehicles: [],
    startTime: null,
    fromPincode: null,
    toPincode: null,
    estimatedTime:null
  },
  reducers: {
    addVehicle: (state, action) => {
      return {
        availableVehicles: action.payload.vehicle.availableVehicles,
        startTime: action.payload.startTime,
        fromPincode: action.payload.fromPincode,
        toPincode: action.payload.toPincode,
        estimatedTime:action.payload.estimatedTime
      };
    },
    removeBookedVehicle: (state, action) => {
      state.availableVehicles = state.availableVehicles.filter(
        (veh) => veh._id !== action.payload
      );
    },
    clearVehicles: () => ({
      availableVehicles: [],
      startTime: null,
      fromPincode: null,
      toPincode: null,
    }),
  },
});


export const { addVehicle, removeBookedVehicle, clearVehicles } = AvailableSlice.actions;
export const AvailableReducer = AvailableSlice.reducer;
