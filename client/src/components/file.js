import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { CreateDict, DictForm, DictMenu } from "./dict.js";

export function SdFile({ data, index }) {
  let { handleFileList, currentIndex, FileList } = useStatus();
  let [Data, setData] = useState(data);

  return (
    <li
      className="sd-file_li"
      onClick={() => currentIndex(index)}
      title={Data.full_name.join("/")}
    >
      <span>{Data.name}</span>
      <button onClick={() => handleFileList("delete", Data)}>x</button>

      <div
        className="current_active"
        style={{ display: index == FileList.index ? "flex" : "none" }}
      ></div>
    </li>
  );
}

export function File({ pn, setpn, data }) {
  let { currentFi, menuFocusing, manageFileList } = useStatus();

  // menu
  let [DictData, setDictData] = useState(data);
  let [ContextMenu, setContextMenu] = useState(false);
  let [Modify, setModify] = useState(false);

  // 파일의 클릭이벤트 발생시
  function mousedownEvent(e) {
    e.stopPropagation();
    menuFocusing(true);
    currentFi(data.id);
    if (e.buttons == 1) {
      manageFileList("insert", DictData);
    } else {
      e.preventDefault();
      setContextMenu(true);
    }
  }

  return (
    <div className="sd-file" title={DictData.full_name.join("/")}>
      {/* main */}
      <div
        className="sd-file_main"
        id={`file${DictData.id}`}
        onMouseDown={mousedownEvent}
      >
        <div className="icons_box">
          <span>
            <i className="fa-solid fa-file"></i>
          </span>
          <span>{DictData.carr ? DictData.carr.join("-") : ""}</span>
        </div>
        <DictForm
          method="put"
          data={data}
          pn={pn}
          setpn={setpn}
          input={Modify}
          setinput={setModify}
        />
      </div>
      {/* menu */}
      <DictMenu
        open={ContextMenu}
        setopen={setContextMenu}
        data={data}
        pn={pn}
        setpn={setpn}
        input={Modify}
        setinput={setModify}
      />
    </div>
  );
}
