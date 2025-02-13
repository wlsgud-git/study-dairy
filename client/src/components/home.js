// css
import "../css/home.css";

// react
import React, { useState, useEffect, useReducer, useRef, memo } from "react";
import { useStatus } from "../context/status.js";
import { Provider } from "react-redux";

// other file
import { store } from "../redux/store.js";

// component
import { Memo } from "./memo.js";
import { Header } from "./header.js";
import { Menu } from "./menu.js";
import { FileList } from "./fileList.js";

// 홈
export const Home = () => {
  return (
    <Provider store={store}>
      <div className="home">
        {/* 메뉴 */}
        <Menu />
        {/* 위쪽부분 */}
        <Header />
        {/* 파일리스트 */}
        <FileList />
        {/* 메모작성칸 */}
        <Memo />
      </div>
    </Provider>
  );
};
