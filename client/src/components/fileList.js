// css
import "../css/home.css";

// middleware
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getList } from "../redux/reducer/fileListSlice.js";

export const FileList = () => {
  const { fileList } = useSelector((state) => state.fileList);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return <ul className="file_list"></ul>;
};
