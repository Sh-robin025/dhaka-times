import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open_popup: "",
};

const authSlice = createSlice({
  name: "auth_popup",
  initialState,
  reducers: {
    set_open_popup: (state, { payload }) => {
      state.open_popup = payload;
    },
  },
});

export const { set_open_popup } = authSlice.actions;
export default authSlice.reducer;
