import { useStatus } from "../context/status.js";
import "../css/memo.css";
import { useState, useEffect } from "react";

function Memo() {
  let { Darkmode, Menu, changeMode, menuFocusing, menuMenu } = useStatus();
  return (
    <div
      className="sd-main_container"
      style={{ display: Menu.adapt && Menu.display ? "none" : "flex" }}
      onClick={() => menuFocusing(false)}
    >
      {/* 메모부분 위쪽 부분기능 */}
      <div className="sd-main_top">
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
        <button className="sd-color_theme_btn" onClick={() => changeMode()}>
          <i className={`fa-solid fa-${Darkmode ? "sun" : "moon"}`}></i>
        </button>
      </div>
      <ul className="sd-current_studing_list"></ul>
      <div className=""></div>
    </div>
  );
}

export default Memo;
