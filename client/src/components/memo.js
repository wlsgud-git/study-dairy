import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../css/memo.css";

const ImgComponent = ({ src }) => {
  let [Size, setSize] = useState({ width: 100, height: 100 });

  return <img src={src} style={{ width: Size.width, height: Size.height }} />;
};

export const Memo = () => {
  let file = useSelector((state) => state.dict.file);
  let fileRef = useRef(null);

  let [Title, setTitle] = useState("");
  let [Menu, setMenu] = useState(false);

  const ImgUploading = async (e) => {
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let src = e.target.result;
        let img = <ImgComponent src={src} />;
      };
      reader.readAsDataURL(file);
    }
  };

  // title변경
  const changeTitle = async () => {};
  // content 변경
  const changeContent = async () => {};
  const ContentEvent = (e) => {
    let key = e.key;
    if (key == "Backspace") {
      let selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const container = range.startContainer;

      if (container.nodeType == 1) e.preventDefault();
    }
  };

  return (
    <div className="memo">
      {/* content */}
      <div className="title_box">
        <form className="title_form">
          <input
            type="text"
            className="title_input"
            placeholder={Title == "" ? "제목" : false}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={changeTitle}
          />
        </form>
      </div>
      <div
        contentEditable
        className="content_box"
        onKeyDown={ContentEvent}
        onBlur={changeContent}
        spellCheck={false}
      >
        {/* {Component} */}
      </div>

      {/* menu */}
      <div className="memo_menu_box">
        {/* menu display button */}
        <button className="memo_menu_btn" onClick={() => setMenu(!Menu)}>
          <i className={`fa-solid fa-chevron-${Menu ? "right" : "left"}`}></i>
        </button>
        {/* menu components */}
        <div className="memo_menu" style={{ display: Menu ? "flex" : "none" }}>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={ImgUploading}
          />
          <button onClick={() => fileRef.current.click()}>
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
