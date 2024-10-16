import "../css/memo.css";
import { useState, useEffect } from "react";

function Memo() {
  let [DarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = DarkMode ? "dark" : "light";
  }, [DarkMode]);

  return (
    <div className="sd-main_container">
      {/* 메모부분 위쪽 부분기능 */}
      <div className="sd-main_top">
        <button className="sd-side_display_btn">
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-maximize"></i>
        </button>
        <button
          className="sd-color_theme_btn"
          onClick={() => setDarkMode(DarkMode ? false : true)}
        >
          <i
            className="fa-solid fa-sun"
            style={{ display: DarkMode ? "block" : "none" }}
          ></i>
          <i
            className="fa-solid fa-moon"
            style={{ display: DarkMode ? "none" : "block" }}
          ></i>
        </button>
      </div>
      <ul className="sd-current_studing_list"></ul>
      <div className=""></div>
    </div>
  );
}

export default Memo;
