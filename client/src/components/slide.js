import "../css/slide.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/rbtree.js";
import { Folder, File, CreateDict } from "./dict.js";

function Slide({ folderService, fileService }) {
  let { Menu, menuFocusing, getDict, currentFol } = useStatus();

  let [Fol, setFol] = useState({ node: new Rbtree(), data: [[]] });
  let [Fi, setFi] = useState({ node: new Rbtree(), data: [[]] });

  useEffect(() => {
    let getData = async () => {
      let data = await getDict(0);
      if (data[0].length) {
        data[0].map((val) => {
          let ar = Fol.node.insert(val.name, val);
          if (ar) setFol((c) => ({ ...c, data: [...c.data, ar] }));
        });
      }
      if (data[1].length) {
        data[1].map((val) => {
          let ar = Fi.node.insert(val.name, val);
          if (ar) setFi((c) => ({ ...c, data: [...c.data, ar] }));
        });
      }
    };
    getData();
  }, []);

  return (
    <div
      className="sd-side_container"
      style={{ display: Menu.display ? "flex" : "none" }}
      onClick={() => menuFocusing(true)}
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
          <button className="sd-folder_add_btn" title="파일추가">
            <i className="fa-solid fa-file-circle-plus"></i>
          </button>
          {/* 폴더 추가 버튼 */}
          <button className="sd-folder_add_btn" title="폴더추가">
            <i className="fa-solid fa-folder-plus"></i>
          </button>
        </div>
      </div>
      {/* 사이드 폴더 리스트 */}
      <ul className="sd-folder_list_container">
        {Fol.data[Fol.data.length - 1].length &&
          Fol.data[Fol.data.length - 1].map((val) => (
            <Folder key={val.info.id} pn={Fol} setpn={setFol} data={val.info} />
          ))}
        {Fi.data[Fi.data.length - 1].length &&
          Fi.data[Fi.data.length - 1].map((val) => (
            <File key={val.info.id} pn={Fi} setpn={setFi} data={val.info} />
          ))}
      </ul>
    </div>
  );
}

export default Slide;
