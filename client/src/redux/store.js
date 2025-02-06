// middleware
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// reducer
import fileListReducer from "../redux/reducer/fileListSlice.js";
import dictReducer from "../redux/reducer/dictSlice.js";

export const store = configureStore({
  reducer: {
    fileList: fileListReducer,
    dict: dictReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
