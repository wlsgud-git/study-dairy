import { useStatus } from "../context/status.js";
import "../css/memo.css";
import { useState, useEffect } from "react";
import { MemoContent } from "./memoContent.js";
import { SdFile } from "../components/file.js";

function Memo() {
  let { Darkmode, Menu, changeMode, menuFocusing, menuMenu, FiInfo, FileList } =
    useStatus();

  return (
    <div
      className="sd-main_container"
      style={{ display: Menu.adapt && Menu.display ? "none" : "flex" }}
      onClick={() => menuFocusing(false)}
    >
      {/* 메모부분 위쪽 부분기능 */}
      <div className="sd-main_top">
        {/* 메뉴 활성화 버튼 */}
        <button
          className="sd-side_display_btn"
          onClickCapture={(e) => {
            e.stopPropagation();
            menuMenu();
            menuFocusing();
          }}
        >
          <i
            className={`fa-solid fa-${
              !Menu.adapt && Menu.display ? "maximize" : "bars"
            }`}
          ></i>
        </button>
        {/* 다크모드 버튼 */}
        <button className="sd-color_theme_btn" onClick={() => changeMode()}>
          <i className={`fa-solid fa-${Darkmode ? "sun" : "moon"}`}></i>
        </button>
      </div>
      {/* 현재 파일 리스트 */}
      <div className="file_lists">
        {FileList.list.map((val, index) => (
          <SdFile key={val.full_name} data={val} index={index} />
        ))}
      </div>
      {/* 메모 content 부분 */}
      <MemoContent />
    </div>
  );
}

export default Memo;
