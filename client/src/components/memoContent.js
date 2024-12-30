import react, { useEffect, useRef, useState } from "react";
import { useStatus } from "../context/status.js";

export function MemoContent() {
  let { FiInfo, FileList, returnDictInfo } = useStatus();

  let ImgRef = useRef(null);
  let [Title, setTitle] = useState();
  let [Content, setContent] = useState();
  let [Menu, setMenu] = useState(false);

  useEffect(() => {
    let current = FileList.list[FileList.index];
    if (current) {
      setTitle(current.title);
      setContent(current.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [FileList]);

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

  async function changeContent() {
    console.log("blur");
    let formData = new FormData();

    formData.append("id", FileList.list[FileList.index].id);
    formData.append("dic_type", "file");
    formData.append("content", Content);

    // await returnDictInfo("put", formData)
    //   .then((data) => {
    //     FileList.list.map((val, index) =>
    //       index == FileList.index ? (val.content = Content) : val
    //     );
    //   })
    //   .catch((err) => alert(err));
  }

  async function imageInsert(e) {
    const file = e.target.files[0];
    const img = document.createElement("img");
    img.className = "sd-memo_preview_img";

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setContent(Content + img);
  }

  return (
    <div className="sd-memo_container">
      <input
        className="sd-title"
        value={Title}
        onBlur={changeTitle}
        onChange={(e) => setTitle(e.target.value)}
        spellCheck="false"
      ></input>
      <div className="sd-memo" contentEditable spellCheck="false"></div>

      <div className="sd-memo_menu">
        <input
          type="file"
          ref={ImgRef}
          style={{ display: "none" }}
          onChange={imageInsert}
        />
        <button
          className="sd-memo_img_btn"
          onClick={() => ImgRef.current.click()}
        >
          <i className="fa-solid fa-image"></i>
        </button>
      </div>
    </div>
  );
}
