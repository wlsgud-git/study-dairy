// import logo from './logo.svg';
import "./css/App.css";
import { useState, useEffect } from "react";

import Slide from "./components/slide.js";
import Memo from "./components/memo.js";

function App() {
  return (
    <div className="App">
      <div className="sd-all_container">
        <Slide />
        <Memo />
      </div>
    </div>
  );
}

export default App;
