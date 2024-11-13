// import logo from './logo.svg';
import "./css/App.css";
import { useState, useEffect } from "react";

import Slide from "./components/slide.js";
import Memo from "./components/memo.js";

function App({ folderService, fileService }) {
  // useEffect(() => {
  //   // 폴더 전부 가져오기
  //   // 파일 전부 가져오기
  // }, []);

  return (
    <div className="App">
      <div className="sd-all_container">
        <Slide folderService={folderService} fileService={fileService} />
        <Memo fileService={fileService} />
      </div>
    </div>
  );
}

export default App;
