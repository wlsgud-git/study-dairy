import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/dict.js";
import { CreateDict, DictForm, DictMenu } from "./dict.js";
import { File } from "./file.js";

let count = 0;

export function Folder({ key, pn, setpn, data }) {
  // let id = useRef(count + 1);
  let { getDict, currentFol, menuFocusing } = useStatus();
  // main
  let [Fol, setFol] = useState({ node: new Rbtree(), data: [[]] });
  function mousedownEvent(e) {
    e.stopPropagation();
    currentFol(data.id);
    menuFocusing(true);
    if (e.buttons == 1) {
      setIsOpen(!IsOpen);
    } else {
      e.preventDefault();
      setContextMenu(true);
    }
  }
  // menu
  let [ContextMenu, setContextMenu] = useState(false);
  // list
  let [IsOpen, setIsOpen] = useState(false);

  // 폴더 리스트
  useEffect(() => {
    let getData = async () => {
      let li = await getDict(data.id);
      li.map((val) => {
        let ar = Fol.node.insert(val.name, val);
        if (ar) setFol((c) => ({ ...c, data: [...c.data, ar] }));
      });
    };
    getData();
  }, []);

  return (
    <div className="sd-folder">
      {/* main */}
      <div
        className="sd-folder_main"
        id={id.current}
        onMouseDown={mousedownEvent}
      >
        <div className="icons_box">
          <span>
            <i
              className={`fa-solid fa-chevron-${IsOpen ? "down" : "right"}`}
            ></i>
          </span>
          <span>
            <i className="fa-solid fa-folder"></i>
          </span>
        </div>
        <DictForm method="put" pn={pn} setpn={setpn} data={data} />
      </div>
      {/* menu */}
      <DictMenu
        open={ContextMenu}
        setopen={setContextMenu}
        data={data}
        pn={pn}
        setpn={setpn}
      />
      {/* lists */}
      <ul className="sd-folder_lists">
        <CreateDict data={data} pn={Fol} setpn={setFol} />
        <div
          className="folder_childs"
          style={{ display: IsOpen ? "flex" : "none" }}
        >
          {Fol.data[Fol.data.length - 1].length
            ? Fol.data[Fol.data.length - 1].map((val) =>
                val.info.dic_type == "folder" ? (
                  <Folder
                    key={val.info.name}
                    data={val.info}
                    pn={Fol}
                    setpn={setFol}
                  />
                ) : (
                  <File
                    key={val.info.name}
                    data={val.info}
                    pn={Fol}
                    setpn={setFol}
                  />
                )
              )
            : ""}
        </div>
      </ul>
    </div>
  );
}
