import { StatusContext, useStatus } from "../../context/status";
import { dictService } from "../..";

import { getList, addList, deleteList } from "../reducer/fileListSlice.js";
import { changeId } from "../reducer/dictSlice.js";

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
  return async (dispatch, getState) => {
    let state = getState();
    let list = state.fileList.list;
    let id = parseInt(info.get("id"));

    if (list.filter((val) => val.id === id).length) {
      alert("이미 존재하는 파일입니다");
      return;
    }
    try {
      const res = await dictService.addFileList(info);
      const data = await res.data[0];
      dispatch(addList(data));
    } catch (err) {
      alert(err);
    }
  };
};

export const deleteFileList = (id, fullname) => {
  return async (dispatch, getState) => {
    let state = getState();
    let list = state.fileList.list;
    let new_id;
    let ft = fullname.join("/");

    if (!list.filter((val) => val.fullname.join("/") === ft).length) return;

    if (list.length >= 2) new_id = list[list[0].id == id ? 1 : 0].id;
    else new_id = 0;

    try {
      const res = await dictService.deleteFileList(id);
      dispatch(deleteList(id));
      dispatch(changeId({ id: new_id, type: false }));
    } catch (err) {
      console.log(err);
    }
  };
};
