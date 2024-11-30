import "../css/dict.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";

export function DictForm({ method, data, pn, setpn }) {
  let { FolInfo, folderCreate, folderModify, DictCrud } = useStatus();
  let forming = useRef(null);
  let [InputVal, setInputVal] = useState(method == "put" ? data.name : "");

  async function submitDict(e) {
    let formData = new FormData();

    if (method == "post") {
      folderCreate();
      if (InputVal == "") return;

      formData.append("full_name", data.full_name + `/${InputVal}`);
      formData.append("name", InputVal);
      formData.append("folder_id", data.id);
      formData.append("dic_type", FolInfo.dic ? "folder" : "file");
    } else {
      folderModify();
      if (InputVal == "" || InputVal == data.name) {
        setInputVal(data.name);
        return;
      }
      let text = data.full_name.split("/").slice(0, -1).join("/");
      let full_name = text == "" ? "/" + InputVal : text + "/" + InputVal;

      formData.append("full_name", full_name);
      formData.append("name", InputVal);
      formData.append("id", data.id);
      formData.append("dic_type", data.dic_type);
      formData.append("modify_data", JSON.stringify(data));
    }

    await DictCrud(method, pn, setpn, formData);
  }

  return (
    <form
      action={method}
      className="sd-dict_from"
      onSubmit={(e) => {
        e.preventDefault();
        forming.current.blur();
      }}
    >
      <input
        className={`sd-${method == "put" ? "put" : "post"}_input`}
        type="text"
        spellCheck="false"
        value={InputVal}
        ref={forming}
        id={`${method}${data.id}`}
        onChange={(e) => setInputVal(e.target.value)}
        onBlur={() => (method == "post" || FolInfo.modify ? submitDict() : "")}
        readOnly={
          method == "put" && FolInfo.id == data.id ? !FolInfo.modify : false
        }
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

export function DictMenu({ open, setopen, data, pn, setpn }) {
  let { folderCreate, folderModify, DictCrud } = useStatus();
  // 메뉴에 이벤트 발생시
  let menu = useRef(null);
  async function menuEvent(e) {
    e.stopPropagation();
    e.preventDefault();

    let event = e.target.innerText;

    if (event == "파일생성" || event == "폴더생성") {
      folderCreate(event == "파일생성" ? false : true);
    } else if (event == "이름변경") {
      folderModify();
    } else {
      DictCrud("delete", pn, setpn, JSON.stringify(data));
    }
  }

  useEffect(() => {
    if (open) menu.current.focus();
  }, [open]);

  return (
    <div
      className="sd-dict_menu"
      style={{ display: open ? "flex" : "none" }}
      tabIndex="0"
      ref={menu}
      onBlur={() => setopen(false)}
    >
      <button
        style={{ display: data.dic_type == "folder" ? "block" : "none" }}
        onMouseDown={menuEvent}
      >
        파일생성
      </button>
      <button
        onMouseDown={menuEvent}
        style={{ display: data.dic_type == "folder" ? "block" : "none" }}
      >
        폴더생성
      </button>
      <button onMouseDown={menuEvent}>이름변경</button>
      <button onMouseDown={menuEvent}>삭제</button>
    </div>
  );
}
