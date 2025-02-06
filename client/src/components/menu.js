//css
import "../css/menu.css";

//middleware
import React, { memo, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

// other file
import { useStatus } from "../context/status.js";
import { emitter } from "../middleware/eventBus.js";

//component
import { Search } from "./search.js";
import { DictList } from "./dictlist.js";
import { DictBtnBox } from "./dictBtn.js";

export const Menu = () => {
  let [Menu, setMenu] = useState(false); // 메뉴 활성화상태

  // 메뉴 활성화
  useEffect(() => {
    const handler = (newState) => setMenu(newState);
    emitter.on("menu", handler);
    return () => emitter.off("menu", handler);
  }, []);

  return (
    <div id="menu" style={{ display: Menu ? "flex" : "none" }}>
      <div className="menu_content">
        {/* file search section */}
        <Search />
        {/* folder add btn section */}
        <DictBtnBox />
        {/* folder list section */}
        <DictList />
      </div>
      {/* menu close sction  */}
      <button
        className="menu_close_btn"
        onClick={() => setMenu(false)}
      ></button>
    </div>
  );
};
