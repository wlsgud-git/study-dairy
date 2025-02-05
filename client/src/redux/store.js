// middleware
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    fileList:
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
