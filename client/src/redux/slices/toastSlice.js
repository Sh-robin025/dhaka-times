import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    set_toast_text: (state, { payload }) => {
      state.text = payload;
    },
  },
});

export const { set_toast_text } = toastSlice.actions;
export default toastSlice.reducer;
