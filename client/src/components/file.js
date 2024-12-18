import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { CreateDict, DictForm, DictMenu } from "./dict.js";

export function File({ pn, setpn, data, reData }) {
  let Target = reData.map((val) => val);
  let { currentFi, menuFocusing } = useStatus();

  // menu
  let [DictData, setDictData] = useState(data);
  let [ContextMenu, setContextMenu] = useState(false);
  let [Modify, setModify] = useState(false);

  useEffect(() => {
    let text = "";
    Target.map((val) => (text += `/${val.name}`));
    setDictData((c) => ({ ...c, allName: `${text}/${DictData.name}` }));
  }, [...Target, DictData.name]);

  // 파일의 클릭이벤트 발생시
  function mousedownEvent(e) {
    e.stopPropagation();
    menuFocusing(true);
    currentFi(data.id);
    if (e.buttons == 1) {
    } else {
      e.preventDefault();
      setContextMenu(true);
    }
  }

  return (
    <div className="sd-file" title={DictData.allName}>
      {/* main */}
      <div className="sd-file_main" onMouseDown={mousedownEvent}>
        <div className="icons_box">
          <span>
            <i className="fa-solid fa-file"></i>
          </span>
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
