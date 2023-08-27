
import { createSlice } from "@reduxjs/toolkit";

const phoneNumSlice = createSlice({
    name: "phoneNum",
    initialState: {
        value: ""
    },
    reducers: {
        setGlobalPhoneNum: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setGlobalPhoneNum} = phoneNumSlice.actions
export default phoneNumSlice