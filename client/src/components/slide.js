import "../css/slide.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";

function Slide({ folderService, fileService }) {
  let { Menu, setMenu, DicInfo, setDicInfo, dicStatus } = useStatus();

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
        <div
          className="sd-dict_contianer"
          style={{ display: DicInfo.inputState ? "flex" : "none" }}
        >
          <form action="post" className="sd-dict_form">
            {/* 폴더/파일 이름부분 */}
            <span>
              <i
                className={`fa-solid fa-${DicInfo.dic ? "folder" : "file"}`}
              ></i>
            </span>
            <input
              type="text"
              className="sd-dict_input"
              onBlur={() => dicStatus(false)}
            />
          </form>
        </div>
      </ul>
    </div>
  );
}

export default Slide;
