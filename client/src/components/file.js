import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/dict.js";
import { CreateDict, DictForm, DictMenu } from "./dict.js";

export function File({ key, pn, setpn, data }) {
  let { currentFi, menuFocusing, deleteDict } = useStatus();

  // menu
  let [ContextMenu, setContextMenu] = useState(false);

  // 파일의 클릭이벤트 발생시
  function mousedownEvent(e) {
    e.stopPropagation();
    menuFocusing(true);
    if (e.buttons == 1) {
      currentFi(data.id);
    } else {
      e.preventDefault();
      setContextMenu(true);
    }
  }

  return (
    <div className="sd-file">
      {/* main */}
      <div className="sd-file_main" onMouseDown={mousedownEvent}>
        <div className="icons_box">
          <span>
            <i className="fa-solid fa-file"></i>
          </span>
        </div>
        <DictForm method="put" data={data} />
      </div>
      {/* menu */}
      <DictMenu
        open={ContextMenu}
        setopen={setContextMenu}
        data={data}
        pn={pn}
        setpn={setpn}
      />
    </div>
  );
}
