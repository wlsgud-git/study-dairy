//css
import "../css/menu.css";

//middleware
import React, { memo, useRef, useState, useEffect } from "react";

// other file
import { useStatus } from "../context/status.js";
import { emitter } from "../middleware/eventBus.js";

//component
import { Search } from "./search.js";
import { DictList } from "./dictlist.js";

export const Menu = () => {
  let [Menu, setMenu] = useState(false);
  let { createBoxControl } = useStatus();

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
        <div className="menu_dictadd_container">
          <button
            title="파일추가"
            onClick={() => createBoxControl(1, { type: false })}
          >
            <i className="fa-solid fa-file-circle-plus"></i>
          </button>
          <button
            title="폴더추가"
            onClick={() => createBoxControl(1, { type: true })}
          >
            <i className="fa-solid fa-folder-plus"></i>
          </button>
        </div>
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
