import { configureStore } from "@reduxjs/toolkit";
import phoneNumSlice from "./phoneNum/phoneNumSlice.js";
import otpTimeSlice from "./otpTime/otpTimeSlice.js";

const store = configureStore({
    reducer: {
      phoneNum: phoneNumSlice.reducer,
      otpTime: otpTimeSlice.reducer
    }
  })

export default store

