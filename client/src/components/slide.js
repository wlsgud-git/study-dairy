import "../css/slide.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/rbtree.js";
import { Folder } from "./folder.js";
import { File } from "./file.js";
import { DictForm } from "./dictform.js";

function Slide({ folderService, fileService }) {
  let { Menu, setMenu, DicInfo, setDicInfo, dicStatus, getDict } = useStatus();

  let [Fol, setFol] = useState(new Rbtree([]));
  let [Fi, setFi] = useState(new Rbtree([]));

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getDict(0);
        // if (data[1].length)
        //   data[1].map((val) => setFi(Fi.insert(val.name, val)));
        // if (data[0].length)
        //   data[0].map((val) => setFol(Fol.insert(val.name, val)));
      } catch (err) {
        console.log(err, " this is error");
      }
    };
    getData();
  }, []);

  return (
    <div
      className="sd-side_container"
      style={{ display: Menu.display ? "flex" : "none" }}
      onClick={() => setMenu((c) => ({ ...c, focusing: true }))}
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
          <span>{DicInfo.id}</span>
          {/* 파일 추가 버튼 */}
          <button
            className="sd-folder_add_btn"
            title="파일추가"
            onClick={() => dicStatus(false)}
          >
            <i className="fa-solid fa-file-circle-plus"></i>
          </button>
          {/* 폴더 추가 버튼 */}
          <button
            className="sd-folder_add_btn"
            title="폴더추가"
            onClick={() => dicStatus(true)}
          >
            <i className="fa-solid fa-folder-plus"></i>
          </button>
        </div>
      </div>
      {/* 사이드 폴더 리스트 */}
      <ul
        className="sd-folder_list_container"
        onClick={() => setDicInfo((c) => ({ ...c, id: 0 }))}
      >
        {/* 딕셔너리 추가박스 */}
        {/* <div
          className="sd-dict_contianer"
          style={{ display: DicInfo.inputState ? "flex" : "none" }}
        >
          <DictForm method="post" />
        </div> */}
        {/* 폴더 / 파일 리스트 */}
        {/* {Fol.arr.length &&
          Fol.arr.map((val) => (
            <Folder key={val.info.id} pa={Fol} setpa={setFol} data={val.info} />
          ))} */}
      </ul>
    </div>
  );
}

export default Slide;
