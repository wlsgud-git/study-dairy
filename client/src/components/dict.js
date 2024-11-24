import "../css/dict.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { Rbtree } from "../middleware/rbtree.js";

function DictForm({ method, data, pn, setpn }) {
  let { FolInfo, folderCreate, createDict } = useStatus();
  let forming = useRef(null);
  let [InputVal, setInputVal] = useState(method == "put" ? data.name : "");

  async function submitDict(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("full_name", data.full_name + `/${InputVal}`);
    formData.append("name", InputVal);
    formData.append("folder_id", data.id);

    if (method == "put") {
      folderCreate(false);
    } else {
      folderCreate(false);
      if (InputVal == "") return;

      try {
        const res = await createDict(formData, FolInfo.dic);
        let data = await res.data[0];
        let ar = pn.node.insert(data.name, data);
        if (ar) setpn((c) => ({ ...c, data: [...c.data, ar] }));
        setInputVal("");
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <form action={method} className="sd-dict_from" onSubmit={submitDict}>
      <input
        className={`sd-${method == "put" ? "put" : "post"}_input`}
        type="text"
        spellCheck="false"
        value={InputVal}
        onChange={(e) => setInputVal(e.target.value)}
        // onBlur={(e) => {
        //   return method == "post" || FolInfo.modify
        //     ? forming.current.submit()
        //     : "none";
        // }}
        readOnly={method == "put" ? !FolInfo.modify : false}
      ></input>
    </form>
  );
}

export function CreateDict({ data, pn, setpn }) {
  let { FolInfo } = useStatus();

  return (
    <div
      className="sd-create_dict_box"
      style={{
        display: FolInfo.id == data.id && FolInfo.create ? "flex" : "none",
      }}
    >
      <div className="sd-create_main">
        <div className="icons_box">
          <span>
            <i className={`fa-solid fa-${FolInfo.dic ? "folder" : "file"}`}></i>
          </span>
        </div>
        <DictForm method="post" data={data} pn={pn} setpn={setpn} />
      </div>
    </div>
  );
}

export function Folder({ key, pn, setpn, data }) {
  let { getDict, currentFol, menuFocusing } = useStatus();
  let [IsOpen, setIsOpen] = useState(false);
  let [ContextMenu, setContextMenu] = useState(false);

  let [Fol, setFol] = useState({ node: new Rbtree(), data: [[]] });

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

  function clickEvent(e) {
    e.stopPropagation();
    currentFol(data.id);
    menuFocusing(true);
    // if (e.buttons == 1) {
    //   setIsOpen(!IsOpen);
    // } else {
    //   setContextMenu(true);
    // }
  }

  useEffect(() => {
    console.log(Fol.data[Fol.data.length - 1]);
  }, [Fol.data]);

  return (
    <div className="sd-folder">
      {/* main */}
      <div className="sd-folder_main" onClickCapture={clickEvent}>
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
        <DictForm method="put" data={data} />
      </div>
      {/* menu */}
      <div
        className="sd-folder_menu"
        style={{ display: ContextMenu ? "flex" : "none" }}
      >
        <button>파일생성</button>
        <button>폴더생성</button>
        <button>삭제</button>
        <button>이름바꾸기</button>
      </div>
      {/* lists */}
      <ul className="sd-folder_lists">
        <CreateDict data={data} />
        {Fol.data[Fol.data.length - 1].length &&
          Fol.data[Fol.data.length - 1].map((val) =>
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
          )}
      </ul>
    </div>
  );
}

export function File({ key, pn, setpn, data }) {
  return (
    <div className="sd-file">
      <div className="sd-file_main">
        <div className="icons_box">
          <span>
            <i className="fa-solid fa-file"></i>
          </span>
        </div>
        <DictForm method="put" data={data} />
      </div>
    </div>
  );
}
