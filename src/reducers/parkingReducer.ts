import { createSlice } from "@reduxjs/toolkit";

const parkingSlice = createSlice({
  name: "parkingSlot",
  initialState: {
    userformdata: {
      carnumber: "",
      bookingid: 0,
      available: true,
      cartiming: "",
      charges:""
    },
  
  },
  reducers: {
    setFormUserData(state, action) {
      console.log("alldata888", action.payload);
      return {
        userformdata: action.payload,
      };
    },
   
  },
});

export const { setFormUserData } = parkingSlice.actions;
export default parkingSlice.reducer;
