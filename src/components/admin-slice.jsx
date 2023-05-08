import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    value: false,
  },
  reducers: {
    setAdmin: (state, action) => {
      //console.log(action.payload);
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
