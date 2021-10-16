import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user_auth",
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { authenticate } = userSlice.actions;
export default userSlice.reducer;
