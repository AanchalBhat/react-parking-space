import { configureStore } from '@reduxjs/toolkit'
import parkingReducer from '../reducers/parkingReducer'


const store = configureStore({
  reducer: {
    parkingSlot: parkingReducer,
    
  }

}

 
);

export default store;
