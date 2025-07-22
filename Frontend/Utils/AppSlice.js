import { createSlice } from '@reduxjs/toolkit'


const AvailableSlice = new createSlice({
  name: "AvailableVehicle",
  initialState: {},
  reducers: {
    addVehicle: (state, action) => {
      return action.payload
    },
    removeVehicle: (state, action) => {
        return null;
    }
  },
});

export const { addVehicle, removeVehicle } = AvailableSlice.actions;
export const AvailableReducer = AvailableSlice.reducer;
