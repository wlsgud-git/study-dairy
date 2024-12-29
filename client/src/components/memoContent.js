import react, { useEffect, useRef, useState } from "react";
import { useStatus } from "../context/status.js";

export function MemoContent() {
  let { FiInfo, FileList, returnDictInfo } = useStatus();

  let [Title, setTitle] = useState();
  let [Content, setContent] = useState();

  useEffect(() => {
    console.log(FileList.index);
    let current = FileList.list[FileList.index];
    if (current) {
      setTitle(current.title);
      setContent(current.content);
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
    let formData = new FormData();

    formData.append("id", FileList.list[FileList.index].id);
    formData.append("dic_type", "file");
    formData.append("content", Content);

    await returnDictInfo("put", formData)
      .then((data) => {
        FileList.list.map((val, index) =>
          index == FileList.index ? (val.content = Content) : val
        );
      })
      .catch((err) => alert(err));
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
      <div className="sd-memo" contentEditable></div>
    </div>
  );
}
