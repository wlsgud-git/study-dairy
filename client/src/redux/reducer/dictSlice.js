import { createSlice } from "@reduxjs/toolkit";

const dictSlice = createSlice({
  name: "dict",
  initialState: {
    folder: 0,
    file: 0,
  },
  reducers: {
    changeId: (state, action) => {
      let { id, type } = action.payload;
      return type ? { ...state, folder: id } : { ...state, file: id };
    },
  },
});

export const { changeId } = dictSlice.actions;
export default dictSlice.reducer;
