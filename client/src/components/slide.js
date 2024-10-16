import "../css/slide.css";

import { useRef, useState, useEffect } from "react";

function Slide() {
  let DicInput = useRef(null);
  let [DicInfo, setDicInfo] = useState({
    state: false,
    value: "",
    making: "",
  });

  async function makeFolder() {}

  useEffect(() => {
    if (DicInfo.state && DicInput.current) DicInput.current.focus();
  }, [DicInfo.state]);

  async function makeDicrectory() {}

  return (
    <div className="sd-side_container">
      {/* 사이드 검색및 폴더추가 */}
      <div className="sd-side_top">
        {/* 파일검색 */}
        <div className="sd-f_search_container">
          {/* 파일 검색창 */}
          <form className="sd-f_search_form">
            <div className="sd-f_search_inputbox">
              <input
                type="text"
                className="sd-f_search_input"
                placeholder="폴더 / 파일 검색"
              />
            </div>
            <div className="sd-f_search_btnbox">
              <button className="sd-f_search_btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
          {/* 파일 검색 결과 */}
          <ul className="sd-f_search_result"></ul>
        </div>
        {/* 폴더추가 */}
        <div className="sd-f_add_container">
          <button
            className="sd-folder_add_btn"
            title="폴더추가"
            onClick={() =>
              setDicInfo((c) => ({ ...c, state: true, making: "folder" }))
            }
          >
            <i className="fa-solid fa-folder-plus"></i>
          </button>
        </div>
      </div>

      {/* 사이드 폴더 리스트 */}
      <ul className="sd-folder_list_container">
        <div
          className="sd-folder_add_box"
          style={{ display: DicInfo.state ? "flex" : "none" }}
        >
          <form
            className="sd-folder_add_form"
            onSubmit={() => makeDicrectory()}
          >
            <span className="sd-current_making">
              <i
                className="fa-solid fa-folder"
                style={{
                  display: DicInfo.making == "folder" ? "block" : "none",
                }}
              ></i>
              <i
                className="fa-solid fa-file"
                style={{
                  display: DicInfo.making == "file" ? "block" : "none",
                }}
              ></i>
            </span>
            <input
              className="sd-folder_add_input"
              ref={DicInput}
              value={DicInfo.value}
              onChange={(e) =>
                setDicInfo((c) => ({ ...c, value: e.target.value }))
              }
              onBlur={(e) =>
                setDicInfo((c) => ({ ...c, state: false, value: "" }))
              }
            />
          </form>
        </div>
      </ul>
    </div>
  );
}

export default Slide;
