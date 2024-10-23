import { useStatus } from "../context/status.js";
import "../css/memo.css";
import { useState, useEffect } from "react";

function Memo() {
  let { Darkmode, setDarkmode, Menu, setMenu } = useStatus();
  return (
    <div
      className="sd-main_container"
      style={{ display: Menu.display[1] ? "flex" : "none" }}
      onClickCapture={() => setMenu((c) => ({ ...c, focusing: false }))}
    >
      {/* 메모부분 위쪽 부분기능 */}
      <div className="sd-main_top">
        <button
          className="sd-side_display_btn"
          // adapt == true면 큰화면(menu) false면 작은화면(focusing)
          onClick={() =>
            setMenu((c) => ({
              ...c,
              focusing: !Menu.adapt ? !Menu.focusing : false,
              menu: Menu.adapt ? !Menu.menu : Menu.menu,
            }))
          }
        >
          <i
            className={`fa-solid fa-${Menu.display[0] ? "maximize" : "bars"}`}
          ></i>
        </button>
        <button
          className="sd-color_theme_btn"
          onClick={() => setDarkmode(Darkmode ? false : true)}
        >
          <i className={`fa-solid fa-${Darkmode ? "sun" : "moon"}`}></i>
        </button>
      </div>
      <ul className="sd-current_studing_list"></ul>
      <div className=""></div>
    </div>
  );
}

export default Memo;
