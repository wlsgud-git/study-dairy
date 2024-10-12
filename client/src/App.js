// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";

function App() {
  let [darkMode, setdarkMode] = useState("dark");
  let [sideDisplay, setsideDisplay] = useState(true);

  return (
    <div className="App">
      <div className="sd-all_container">
        {/* 사이드 콘테이너 */}
        <div
          className="sd-side_container"
          style={{ display: sideDisplay ? "flex" : "none" }}
        >
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
              <button className="sd-folder_add_btn" title="폴더추가">
                <i className="fa-solid fa-folder-plus"></i>
              </button>
            </div>
          </div>

          {/* 사이드 폴더 리스트 */}
          <ul className="sd-folder_list_container"></ul>
        </div>
        {/* 메모하는 부분 */}
        <div className="sd-main_container">
          <div className="sd-main_top"></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default App;
