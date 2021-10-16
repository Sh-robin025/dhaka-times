import { configureStore } from "@reduxjs/toolkit";
import popUpReducer from "./slices/popupSlice";
import userReducer from "./slices/userSlice";
import loadingReducer from "./slices/loadingSlice";
import newsSlice from "./slices/newsSlice";

export default configureStore({
  reducer: {
    popup: popUpReducer,
    loader: loadingReducer,
    user: userReducer,
    news: newsSlice,
  },
});
