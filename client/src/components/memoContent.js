import react, { useEffect, useRef, useState } from "react";
import { useStatus } from "../context/status.js";

function MemoImg({ src }) {
  let [ImgSize, setImgSize] = useState({
    width: 100,
    height: 100,
    cursor: "default",
  });
  const [StartPos, setStartPos] = useState({ x: 0, y: 0 });
  const [Size, setSize] = useState({ x: 0, y: 0 });
  let [Resize, setResize] = useState(false);

  function condition(x, y) {
    return (
      x <= 10 || x >= ImgSize.width - 10 || y <= 10 || y >= ImgSize.height - 10
    );
  }

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

  function handelMouseDown(e) {
    e.preventDefault();

    let intX = parseInt(e.clientX - e.target.getBoundingClientRect().left);
    let intY = parseInt(e.clientY - e.target.getBoundingClientRect().top);

    setResize(condition(intX, intY) ? true : false);
    setSize((c) => ({ ...c, x: ImgSize.width, y: ImgSize.height }));
    setStartPos((c) => ({ ...c, x: e.pageX, y: e.pageY }));
  }

  return (
    <img
      src={src}
      style={{
        width: ImgSize.width,
        height: ImgSize.height,
        cursor: Resize ? "grabbing" : ImgSize.cursor,
      }}
      className="sd-memo_preview_img"
      onMouseMove={handleMouseMove}
      onMouseDown={handelMouseDown}
      onMouseUp={() => setResize(false)}
      onMouseLeave={() => setResize(false)}
    />
  );
}

export function MemoContent() {
  let { FiInfo, FileList, returnDictInfo } = useStatus();

  let memo = document.querySelector(".sd-memo");

  let ContentRef = useRef(null);
  let ImgRef = useRef(null);

  let [Title, setTitle] = useState();
  let [Content, setContent] = useState([]);
  let [Menu, setMenu] = useState(true);

  // 파일 인덱스가 변할때
  useEffect(() => {
    let current = FileList.list[FileList.index];
    if (current) {
      setTitle(current.title);
      setContent(Content.filter((val) => val));
      if (ContentRef.current) memo.innerHTML = current.content;
    } else {
      setTitle("");
      setContent(Content.filter((val) => val));
      // if (ContentRef.current) memo.innerHTML = "";
    }
  }, [FileList]);

  // 이미지 삽입후 커서 위치
  useEffect(() => {
    const input = ContentRef.current;
    if (input) {
      const range = document.createRange();
      const selection = document.getSelection();

      range.selectNodeContents(input);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);

      input.focus();
    }
  }, [Content]);

  // 제목 변환
  async function changeTitle() {
    let formData = new FormData();

    formData.append("id", FileList.list[FileList.index].id);
    formData.append("dic_type", "file");
    formData.append("title", Title);

    await returnDictInfo("put", formData)
      .then((data) => {
        FileList.list.map((val, index) =>
          index == FileList.index ? (val.title = Title) : val
        );
      })
      .catch((err) => alert(err));
  }

  // 이미지 삽입
  function imginsert(e) {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let src = URL.createObjectURL(file);
        setContent([...Content, <MemoImg src={src} />]);
      };

      reader.readAsDataURL(file);
    }
  }

  async function changeContent(e) {
    let formData = new FormData();
    let content = e.target.innerHTML;

    formData.append("id", FileList.list[FileList.index].id);
    formData.append("dic_type", "file");
    formData.append("content", content);

    await returnDictInfo("put", formData)
      .then((data) => {
        FileList.list.map((val, index) =>
          index == FileList.index ? (val.content = content) : val
        );
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="sd-memo_container">
      {/* title */}
      <input
        className="sd-title"
        value={Title}
        onBlur={changeTitle}
        onChange={(e) => setTitle(e.target.value)}
        spellCheck="false"
      ></input>
      {/* content */}
      <div
        className="sd-memo"
        ref={ContentRef}
        contentEditable={FileList.list.length ? true : false}
        spellCheck={false}
        onBlur={changeContent}
        suppressContentEditableWarning={true}
      >
        {Content}
      </div>

      {/* memo menu */}
      <div
        className="sd-memo_menu"
        style={{
          right: Menu ? 0 : "-62px",
        }}
      >
        <button className="sd-menu_show_btn" onClick={() => setMenu(!Menu)}>
          <i className={`fa-solid fa-angle-${Menu ? "right" : "left"}`}></i>
        </button>
        <div className="sd-menu_content_box">
          <input
            type="file"
            ref={ImgRef}
            style={{ display: "none" }}
            onChange={imginsert}
          />
          <button
            className="sd-memo_img_btn"
            onClick={() => ImgRef.current.click()}
          >
            <i className="fa-solid fa-image"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
