import "../css/dict.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";

function DictForm({ method, data = undefined }) {
  let [ReadOnly, setReadOnly] = useState(true);
  let [InputVal, setInputVal] = useState(data ? data.name : "");
  return (
    <form action={method} className="sd-dict_from">
      <input
        className="sd-dict_input"
        type="text"
        spellCheck="false"
        value={InputVal}
        onChange={(e) => setInputVal(e.target.value)}
        readOnly={method == "put" ? ReadOnly : false}
      ></input>
    </form>
  );
}

export function CreateDict({}) {
  return (
    <div className="sd-create_dict_box">
      <div className="icons_box">
        <span>
          <i className="fa-solid fa-folder"></i>
        </span>
      </div>
    </div>
  );
}

export function Folder({ key, pn, setpn, data }) {
  let { DicInfo, setDicInfo, dicStatus, getDict, currentFol } = useStatus();
  let [IsOpen, setIsOpen] = useState(false);
  let [ContextMenu, setContextMenu] = useState(false);

  // let [Fol, setFol] = useState({ node: new Rbtree(), data: [[]] });
  // let [Fi, setFi] = useState({ node: new Rbtree(), data: [[]] });

  // useEffect(() => {
  //   let getData = async () => {
  //     let data = await getDict(data.id);
  //     if (data[0].length) {
  //       data[0].map((val) => {
  //         let ar = Fol.node.insert(val.name, val);
  //         if (ar) setFol((c) => ({ ...c, data: [...c.data, ar] }));
  //       });
  //     }
  //     if (data[1].length) {
  //       data[1].map((val) => {
  //         let ar = Fi.node.insert(val.name, val);
  //         if (ar) setFi((c) => ({ ...c, data: [...c.data, ar] }));
  //       });
  //     }
  //   };
  //   getData();
  // }, []);

  function clickEvent(e) {
    currentFol(data.id);
    if (e.buttons == 1) {
      setIsOpen(!IsOpen);
    } else {
      setContextMenu(true);
    }
  }

  return (
    <div className="sd-folder" onMouseDown={clickEvent}>
      <div className="icons_box">
        <span>
          <i className={`fa-solid fa-chevron-${IsOpen ? "down" : "right"}`}></i>
        </span>
        <span>
          <i className="fa-solid fa-folder"></i>
        </span>
      </div>
      <DictForm method="put" data={data} />

      <div
        className="sd-folder_menu"
        style={{ display: ContextMenu ? "flex" : "none" }}
      >
        <button>파일생성</button>
        <button>폴더생성</button>
        <button>삭제</button>
        <button>이름바꾸기</button>
      </div>
      <div className="sd-folder_lists"></div>
    </div>
  );
}

export function File({ key, pn, setpn, data }) {
  return (
    <div className="sd-file">
      <div className="icons_box">
        <span>
          <i className="fa-solid fa-file"></i>
        </span>
      </div>
      <DictForm method="put" data={data} />
    </div>
  );
}
