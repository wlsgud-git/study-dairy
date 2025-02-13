// css
import "../css/memo.css";

// middleware
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactDOMServer from "react-dom/server";

// other file
import { dictService } from "../index.js";
import { Form } from "../middleware/form.js";

let form = new Form();

const ImgComponent = ({ src }) => {
  let [ImgSize, setImgSize] = useState({
    width: 100,
    height: 100,
    cursor: "default",
  });
  const [StartPos, setStartPos] = useState({ x: 0, y: 0 });
  const [Size, setSize] = useState({ x: 0, y: 0 });
  let [Resize, setResize] = useState(false);
  let [ImgDel, setImgDel] = useState(false);

  function condition(x, y) {
    return (
      x <= 10 || x >= ImgSize.width - 10 || y <= 10 || y >= ImgSize.height - 10
    );
  }

  // 마우스 무브 이벤트
  function handleMouseMove(e) {
    let intX = parseInt(e.clientX - e.target.getBoundingClientRect().left);
    let intY = parseInt(e.clientY - e.target.getBoundingClientRect().top);
    if (Resize) {
      let newWidth = Size.x - StartPos.x + e.pageX;
      let newHeight = Size.y - StartPos.y + e.pageY;
      setImgSize({
        width: newWidth < 50 ? 50 : newWidth,
        height: newHeight < 50 ? 50 : newHeight,
      });
    } else
      setImgSize((c) => ({
        ...c,
        cursor: condition(intX, intY) ? "grab" : "default",
      }));
  }

  // 마우스 다운 이벤트
  function handelMouseDown(e) {
    e.preventDefault();

    let btn = e.buttons;
    if (btn == 1) {
      let intX = parseInt(e.clientX - e.target.getBoundingClientRect().left);
      let intY = parseInt(e.clientY - e.target.getBoundingClientRect().top);
      setResize(condition(intX, intY) ? true : false);
      setSize((c) => ({ ...c, x: ImgSize.width, y: ImgSize.height }));
      setStartPos((c) => ({ ...c, x: e.pageX, y: e.pageY }));
    } else {
      setImgDel(true);
    }
  }

  return (
    <img
      src={src}
      onMouseMove={handleMouseMove}
      onMouseDown={handelMouseDown}
      onMouseUp={() => setResize(false)}
      onMouseLeave={() => setResize(false)}
      className="content_img"
      style={{
        width: ImgSize.width,
        height: ImgSize.height,
        cursor: Resize ? "grabbing" : ImgSize.cursor,
      }}
    />
  );
};

export const Memo = () => {
  let memo = document.querySelector(".content_box");
  let file = useSelector((state) => state.dict.file);
  let fileRef = useRef(null);

  // --------------------------------------------------------------------------------------------------------------

  let titleRef = useRef(null);
  let [DB, setDB] = useState({});
  let [Title, setTitle] = useState("");
  let [Content, setContent] = useState([]);

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
      } else {
      }
    });
    return arr;
  };

  const changeTitle = async () => {
    let info = {
      id: file,
      title: Title,
      dic_type: "file",
    };

    try {
      let res = await dictService.updateDict(form.forming(info));
      let data = await res.data[0];
    } catch (err) {
      throw err;
    }
  };
  const changeContent = async () => {
    let content = memo.innerHTML;
    let info = {
      id: file,
      content,
      dic_type: "file",
    };
    try {
      let res = await dictService.updateDict(form.forming(info));
      let data = await res.data[0];
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (!file) return;

    let check = async () => {
      try {
        let res = await dictService.getFile(file);
        const data = await res.data[0];

        setTitle(data.title);
        updateContent(data.content);
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
      setContent((c) => [...c, <ImgComponent src={src} />]);
    } catch (err) {
      throw err;
    }
  };

  // 이미지 삽입후 커서 위치 이미지 뒤로 보냄
  // useEffect(() => {
  //   const input = memoRef.current;
  //   if (input) {
  //     const range = document.createRange();
  //     const selection = document.getSelection();
  //     range.selectNodeContents(input);
  //     range.collapse(false);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //     input.focus();
  //   }
  // }, [Content]);

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
      >
        {Content}
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
            name="content_img"
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
