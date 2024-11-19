import "../css/App.css";
import { useRef, useState, useEffect } from "react";
import { useStatus } from "../context/status.js";

export function DictForm({ method, dic = undefined }) {
  let { DicInfo, setDicInfo, dicStatus } = useStatus();
  //   useEffect(() => console.log(dic), []);

  async function dicSubmit(e) {
    e.preventDefault();
    dicStatus(false);
  }
  return (
    <form action={method} className="sd-dict_form" onSubmit={dicSubmit}>
      {/* 폴더/파일 이름부분 */}
      <span>
        {!dic ? (
          <i className={`fa-solid fa-${DicInfo.dic ? "folder" : "file"}`}></i>
        ) : (
          <i className={`fa-solid fa-${dic}`}></i>
        )}
      </span>
      <input type="text" className="sd-dict_input" onBlur={dicSubmit} />
    </form>
  );
}
