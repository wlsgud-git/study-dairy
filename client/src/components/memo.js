// css
import "../css/memo.css";

// middleware
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DOMpurify from "dompurify";
// other file
import { dictService } from "../index.js";
import { Form } from "../middleware/form.js";
import { Element } from "../middleware/element.js";

let form = new Form();
let el = new Element();

export const Memo = () => {
  let memo = document.querySelector(".content_box");
  let file = useSelector((state) => state.dict.file);
  let fileRef = useRef(null);

  // --------------------------------------------------------------------------------------------------------------

  let titleRef = useRef(null);
  let [DB, setDB] = useState({});
  let [Title, setTitle] = useState("");

  // 콘텐츠 내용을 array 형태로 변환
  const updateContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    let arr = [];
    let child = doc.body.childNodes;

    child.forEach((val, idx) => {
      let type = val.nodeType;

      if (type == 1) {
        let NodeTag = val.nodeName;
        arr.push(NodeTag == "IMG" ? el.elementOfImg({ element: val }) : val);
      } else {
        arr.push(el.elementOfSpan(val.textContent));
      }
    });
    return arr;
  };
  // 제목 변경
  const changeTitle = async () => {
    let info = {
      id: file,
      title: Title,
      dic_type: "file",
    };

    try {
      let res = await dictService.updateDict(form.forming(info));
      let { id, title, content } = await res.data[0];

      setDB((c) => ({ ...c, [file]: { ...c[file], title } }));
      setTitle(title);
    } catch (err) {
      throw err;
    }
  };
  // 콘텐츠 변경
  const changeContent = async () => {
    let content = DOMpurify.sanitize(memo.innerHTML);
    let info = {
      id: file,
      content,
      dic_type: "file",
    };
    try {
      let res = await dictService.updateDict(form.forming(info));
      let { id, title, content } = await res.data[0];

      let conArr = updateContent(content);

      setDB((c) => ({ ...c, [file]: { ...c[file], content: conArr } }));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (!file) return;
    memo.innerHTML = "";

    if (file in DB) {
      setTitle(DB[file].title);
      DB[file].content.map((val) => memo.appendChild(val));
      return;
    }

    let check = async () => {
      try {
        let res = await dictService.getFile(file);
        const { id, title, content } = await res.data[0];

        let conArr = updateContent(content);

        setDB((c) => ({ ...c, [file]: { title, content: conArr } }));
        setTitle(title);
        conArr.map((val) => memo.appendChild(val));
      } catch (err) {
        throw err;
      }
    };
    check();
  }, [file]);

  // --------------------------------------------------------------------------------------------------------------

  // 이미지 업로드
  const ImgUploading = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    let info = {
      content_img: file,
    };

    try {
      const { key, src } = await dictService.ImgUpload(info);
      memo.appendChild(el.elementOfImg({ src }));
      cursorMoveToLast();
    } catch (err) {
      throw err;
    }
  };

  // 이미지 삽입후 커서 위치 이미지 뒤로 보냄
  const cursorMoveToLast = () => {
    const input = contentRef.current;
    if (input) {
      const range = document.createRange();
      const selection = document.getSelection();
      range.selectNodeContents(input);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      input.focus();
    }
  };

  let [Menu, setMenu] = useState(false);
  let contentRef = useRef(null);

  return (
    <div className="memo" style={{ display: file ? "flex" : "none" }}>
      {/* title */}
      <div className="title_box">
        <form
          className="title_form"
          onSubmit={(e) => {
            e.preventDefault();
            titleRef.current.blur();
          }}
        >
          <input
            type="text"
            ref={titleRef}
            className="title_input"
            spellCheck={false}
            // placeholder={Title == "" ? "제목" : false}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={changeTitle}
          />
        </form>
      </div>
      {/* content */}
      <div
        ref={contentRef}
        className="content_box"
        contentEditable
        suppressContentEditableWarning
        onBlur={changeContent}
        spellCheck={false}
      ></div>

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
            name="content_img"
            style={{ display: "none" }}
            onChange={ImgUploading}
          />
          <button onClick={() => fileRef.current.click()}>
            <i className="fa-solid fa-image"></i>
          </button>
          <button>
            <i className="fa-solid fa-font"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
