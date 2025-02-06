// css
import "../css/home.css";

// middleware
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// action
import { getFileList, deleteFileList } from "../redux/action/fileListAction.js";

const CurrentFile = ({ data }) => {
  let dispatch = useDispatch();
  return (
    <li className="current_file" title={data.fullname.join("/")}>
      <span>{data.fullname[data.fullname.length - 1]}</span>
      <button onClick={() => dispatch(deleteFileList(data.id, data.fullname))}>
        X
      </button>
    </li>
  );
};

export const FileList = () => {
  const { list } = useSelector((state) => state.fileList);
  let dispatch = useDispatch();

  // 리스트 가져오기
  useEffect(() => {
    dispatch(getFileList());
  }, [dispatch]);

  return (
    <ul className="file_list">
      {list.length
        ? list.map((val) => <CurrentFile key={val.fullname} data={val} />)
        : ""}
    </ul>
  );
};
