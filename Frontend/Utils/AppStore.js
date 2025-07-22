import { configureStore } from '@reduxjs/toolkit'
import { AvailableReducer } from '../Utils/AppSlice';
import { BookingReducer } from '../Utils/AppSlice';

const Store = configureStore(
    {
       reducer:
       {
           AvailableReducer:AvailableReducer,
       }
    })

export default Store;

