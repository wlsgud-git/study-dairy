//middleware
import { useEffect, useState } from "react";

// other file
import { useStatus } from "../context/status";
import { emitter } from "../middleware/eventBus.js";

export const Header = () => {
  let [DarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = DarkMode ? "dark" : "light";
  }, [DarkMode]);

  return (
    <div className="home_header">
      {/* 메뉴창 버튼 */}
      <button onClick={() => emitter.emit("menu", true)}>
        <i className="fa-brands fa-elementor"></i>
      </button>
      {/* 다크모드 버튼 */}
      <button onClick={() => setDarkMode(!DarkMode)}>
        <i className={`fa-solid fa-${DarkMode ? "sun" : "moon"}`}></i>
      </button>
    </div>
  );
};
