//css
import { useEffect } from "react";
import "../css/menu.css";

//middleware
import { emitter } from "../middleware/eventBus.js";
import { useSelector } from "react-redux";

export const DictBtnBox = () => {
  let folder = useSelector((state) => state.dict.folder);
  const activeCreateBox = (dic_type) =>
    emitter.emit(`create${folder}`, dic_type);

  return (
    <div className="menu_dictadd_container">
      <button title="파일추가" onClick={() => activeCreateBox(false)}>
        <i className="fa-solid fa-file-circle-plus"></i>
      </button>
      <button title="폴더추가" onClick={() => activeCreateBox(true)}>
        <i className="fa-solid fa-folder-plus"></i>
      </button>
    </div>
  );
};
