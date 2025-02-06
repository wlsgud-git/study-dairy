import { useStatus } from "../../context/status";
import { dictService } from "../..";

import { getList, addList } from "../reducer/fileListSlice.js";

export const getFileList = () => {
  return async (dispatch) => {
    try {
      const res = await dictService.getFileList();
      const list = await res.data;
      dispatch(getList(list));
    } catch (err) {
      alert(err);
    }
  };
};

export const addFileList = (info) => {
  return async (dispatch) => {
    try {
      const res = await dictService.addFileList(info);
      const data = await res.data;
      dispatch(addList(data));
    } catch (err) {
      alert(err);
    }
  };
};
