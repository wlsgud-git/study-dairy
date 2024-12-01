import "../css/slide.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/dict.js";
import { CreateDict } from "./dict.js";
import { Folder } from "./folder.js";
import { File } from "./file.js";

function Slide() {
  let { Menu, menuFocusing, DictCrud, currentFol, folderCreate } = useStatus();

  let [Fol, setFol] = useState({ node: new Rbtree(), data: [[]] });

  useEffect(() => {
    let datas = async () =>
      await DictCrud("get", Fol, setFol, 0).catch((err) => console.log(err));
    datas();
  }, []);

  return (
    <div
      className="sd-side_container"
      style={{ display: Menu.display ? "flex" : "none" }}
      onMouseDown={() => menuFocusing(true)}
    >
      {/* 사이드 검색및 폴더추가 */}
      <div className="sd-side_top">
        {/* 파일검색 */}
        <div className="sd-f_search_container">
          {/* 파일 검색창 */}
          <form className="sd-f_search_form">
            <div className="sd-f_search_inputbox">
              <input
                type="text"
                className="sd-f_search_input"
                placeholder="폴더 / 파일 검색"
              />
            </div>
            <div className="sd-f_search_btnbox">
              <button className="sd-f_search_btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
          {/* 파일 검색 결과 */}
          <ul className="sd-f_search_result"></ul>
        </div>
        {/* 폴더추가 */}
        <div className="sd-f_add_container">
          {/* <span>{DicInfo.id}</span> */}
          {/* 파일 추가 버튼 */}
          <button
            className="sd-folder_add_btn"
            title="파일추가"
            onClick={() => folderCreate(false)}
          >
            <i className="fa-solid fa-file-circle-plus"></i>
          </button>
          {/* 폴더 추가 버튼 */}
          <button
            className="sd-folder_add_btn"
            title="폴더추가"
            onClick={() => folderCreate(true)}
          >
            <i className="fa-solid fa-folder-plus"></i>
          </button>
        </div>
      </div>
      {/* 사이드 폴더 리스트 */}
      <ul
        className="sd-folder_list_container"
        onMouseDown={() => currentFol(0)}
      >
        <CreateDict
          data={{ id: 0, dic_type: "folder" }}
          pn={Fol}
          setpn={setFol}
        />
        {Fol.data[Fol.data.length - 1].length
          ? Fol.data[Fol.data.length - 1].map((val) =>
              val.info.dic_type == "folder" ? (
                <Folder
                  key={val.info.name}
                  id={val.id}
                  data={val.info}
                  pn={Fol}
                  setpn={setFol}
                />
              ) : (
                <File
                  key={val.info.name}
                  data={val.info}
                  pn={Fol}
                  setpn={setFol}
                />
              )
            )
          : ""}
      </ul>
    </div>
  );
}

export default Slide;
