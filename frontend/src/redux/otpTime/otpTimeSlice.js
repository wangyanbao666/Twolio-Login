import { createSlice } from "@reduxjs/toolkit";

const otpTimeSlice = createSlice({
    name: "optTime",
    initialState: {
        value: 0
    },
    reducers: {
        otpTimeReduce(state){
            if (state.value>0) {
                state.value--;
            }
        },
        otpTimeReset(state){
            state.value = 60
        }
    }
})

export const {otpTimeReduce, otpTimeReset} = otpTimeSlice.actions
export default otpTimeSlice