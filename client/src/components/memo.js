import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/memo.css";

export const Memo = () => {
  let file = useSelector((state) => state.dict.file);

  let [Title, setTitle] = useState("");
  let [Content, setContent] = useState("");
  let [Menu, setMenu] = useState(false);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="memo">
      {/* content */}
      <div className="title_box">
        <form className="title_form">
          <input type="text" className="title_input" />
        </form>
      </div>
      <div contentEditable className="content_box"></div>

      {/* menu */}
      <div className="memo_menu_box">
        {/* menu display button */}
        <button className="memo_menu_btn" onClick={() => setMenu(!Menu)}>
          <i className={`fa-solid fa-chevron-${Menu ? "right" : "left"}`}></i>
        </button>
        {/* menu components */}
        <div className="memo_menu" style={{ display: Menu ? "flex" : "none" }}>
          <button>
            <i className="fa-solid fa-image"></i>
          </button>
          <button>
            <i class="fa-solid fa-font"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
