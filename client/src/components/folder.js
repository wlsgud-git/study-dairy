import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/dict.js";
import { CreateDict, DictForm, DictMenu } from "./dict.js";
import { File } from "./file.js";

export function Folder({ pn, setpn, data, reData }) {
  let Target = reData.map((val) => val);
  let { currentFol, menuFocusing, DictCrud } = useStatus();
  let [DictData, setDictData] = useState(data);

  // 현재 폴더의 자식부분
  let [Fol, setFol] = useState({ node: new Rbtree(), arr: [] });

  // 폴더의 전체이름
  useEffect(() => {
    let text = "";
    Target.map((val) => (text += `/${val.name}`));
    setDictData((c) => ({ ...c, allName: `${text}/${DictData.name}` }));
  }, [...Target, DictData.name]);

  function mousedownEvent(e) {
    e.stopPropagation();
    currentFol(DictData.id);
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
  // modify
  let [ModInput, setModInput] = useState(false);

  // 현 폴더의 자식들
  useEffect(() => {
    let datas = async () => {
      await DictCrud("get", Fol, setFol, DictData).catch((err) => alert(err));
    };
    datas();
  }, []);

  return (
    <div className="sd-folder" title={DictData.allName}>
      {/* main */}
      <div className="sd-folder_main" onMouseDown={mousedownEvent}>
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
        <DictForm
          method="put"
          pn={pn}
          setpn={setpn}
          data={DictData}
          input={ModInput}
          setinput={setModInput}
        />
      </div>
      {/* menu */}
      <DictMenu
        open={ContextMenu}
        setopen={setContextMenu}
        data={DictData}
        pn={pn}
        setpn={setpn}
        input={ModInput}
        setinput={setModInput}
      />
      {/* lists */}
      <ul className="sd-folder_lists">
        <CreateDict data={DictData} pn={Fol} setpn={setFol} />
        <div
          className="folder_childs"
          style={{ display: IsOpen ? "flex" : "none" }}
        >
          {Fol.arr.length
            ? Fol.arr.map((val) =>
                val.info.dic_type == "folder" ? (
                  <Folder
                    key={val.info.name}
                    data={val.info}
                    pn={Fol}
                    setpn={setFol}
                    reData={[...Target, DictData]}
                  />
                ) : (
                  <File
                    key={val.info.name}
                    data={val.info}
                    pn={Fol}
                    setpn={setFol}
                    reData={[...Target, DictData]}
                  />
                )
              )
            : ""}
        </div>
      </ul>
    </div>
  );
}
