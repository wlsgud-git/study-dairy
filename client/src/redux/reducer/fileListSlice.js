import { createSlice } from "@reduxjs/toolkit";

const fileListSlice = createSlice({
  name: "fileList",
  initialState: {
    list: [],
  },
  reducers: {
    getList: (state, lists) => {
      return { ...state, list: [...lists.payload] };
    },
    addList: (state, value) => {
      return { ...state, list: [...state.list, value] };
    },
  },
});

export const { getList, addList } = fileListSlice.actions;
export default fileListSlice.reducer;
