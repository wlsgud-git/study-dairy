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
    addList: (state, data) => {
      return { ...state, list: [...state.list, data.payload] };
    },

    deleteList: (state, data) => {
      return {
        ...state,
        list: state.list.filter((val) => val.id !== data.payload),
      };
    },
  },
});

export const { getList, addList, deleteList } = fileListSlice.actions;
export default fileListSlice.reducer;
