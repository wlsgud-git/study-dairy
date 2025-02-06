import { createSlice } from "@reduxjs/toolkit";

const fileListSlice = createSlice({
  name: "fileList",
  initialState: {
    list: [],
    check: {},
  },
  reducers: {
    getList: (state, data) => {
      return {
        ...state,
        list: [...data.payload.list],
        check: data.payload.check,
      };
    },
    addList: (state, data) => {
      return {
        ...state,
        check: { ...state.check, [data.payload.id]: true },
        list: [...state.list, data.payload],
      };
    },

    updateList: (state, info) => {
      let { id, fullname } = info.payload;
      return {
        ...state,
        list: state.list.map((val) =>
          val.id == id ? { ...val, fullname } : val
        ),
      };
    },

    deleteList: (state, data) => {
      let new_check = { ...state.check };
      delete new_check[data.payload];
      return {
        ...state,
        check: new_check,
        list: state.list.filter((val) => val.id !== data.payload),
      };
    },
  },
});

export const { getList, addList, updateList, deleteList } =
  fileListSlice.actions;
export default fileListSlice.reducer;
