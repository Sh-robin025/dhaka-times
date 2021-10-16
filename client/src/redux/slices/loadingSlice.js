import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    set_loader: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { set_loader } = loadingSlice.actions;
export default loadingSlice.reducer;
