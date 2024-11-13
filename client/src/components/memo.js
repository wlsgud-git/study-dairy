import { useStatus } from "../context/status.js";
import "../css/memo.css";
import { useState, useEffect } from "react";

function Memo() {
  let { Darkmode, setDarkmode, Menu, setMenu } = useStatus();
  return (
    <div
      className="sd-main_container"
      style={{ display: Menu.adapt && Menu.display ? "none" : "flex" }}
      onClickCapture={() => setMenu((c) => ({ ...c, focusing: false }))}
    >
      {/* 메모부분 위쪽 부분기능 */}
      <div className="sd-main_top">
        <button
          className="sd-side_display_btn"
          onClick={() =>
            setMenu((c) => ({
              ...c,
              menu: Menu.adapt ? true : !Menu.menu,
              focusing: Menu.adapt ? true : !Menu.menu,
              display: Menu.adapt ? !Menu.focusing : !Menu.menu,
            }))
          }
        >
          <i
            className={`fa-solid fa-${
              !Menu.adapt && Menu.display ? "maximize" : "bars"
            }`}
          ></i>
        </button>
        <button
          className="sd-color_theme_btn"
          onClick={() => setDarkmode(!Darkmode)}
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
