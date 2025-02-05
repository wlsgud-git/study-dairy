import { createSlice } from "@reduxjs/toolkit";

const fileListSlice = createSlice({
  name: "fileList",
  initialState: [],
  reducers: {
    getList: (state, lists) => {
      state = lists.map((val) => val);
    },
    addList: (state, value) => {
      state = [...state, value];
    },
  },
});

export const { getList, addList } = fileListSlice.actions;
export default fileListSlice.reducer;
