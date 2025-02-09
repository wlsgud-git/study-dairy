// css
import "../css/search.css";

// middleware
import React, { memo, useEffect, useState } from "react";
import { useStatus } from "../context/status";
import { useDispatch } from "react-redux";

// other file
import { Form } from "../middleware/form.js";
import { addFileList } from "../redux/action/fileListAction.js";
import { changeId } from "../redux/reducer/dictSlice.js";

let form = new Form();

export const Search = () => {
  let dispatch = useDispatch();
  let { searchFile } = useStatus();
  let [Value, setValue] = useState("");
  let [List, setList] = useState({ state: false, arr: [] });

  useEffect(() => {
    if (Value == "") {
      setList((c) => ({ ...c, arr: [] }));
      return;
    }
    const result = async () => {
      await searchFile(Value)
        .then((li) => setList((c) => ({ ...c, arr: li.arr.map((val) => val) })))
        .catch((err) => alert(err));
    };
    result();
  }, [Value]);

  useEffect(() => showList(1), [List.arr]);

  function showList(action) {
    if (!action) setList((c) => ({ ...c, state: false }));
    else {
      setList((c) => ({
        ...c,
        state: Value == "" || !List.arr.length ? false : true,
      }));
    }
  }

  function LiMouseDownEvent(data) {
    dispatch(changeId({ id: data.id, type: false }));
    dispatch(
      addFileList(form.forming({ id: data.id, fullname: data.fullname }))
    );
  }

  return (
    <div className="search_container">
      <div className="search_box">
        <div className="search_inputbox">
          <form action="get" className="file_search_form">
            <input
              spellCheck={false}
              placeholder="파일명을 입력하세요"
              className="file_search_input"
              value={Value}
              onFocus={() => showList(1)}
              onBlur={() => showList(0)}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </div>
        <div
          className="search_lists"
          style={{ display: List.state ? "flex" : "none" }}
        >
          {List.state
            ? List.arr.map((val) => (
                <li
                  key={val.fullname}
                  className="file_li"
                  onMouseDown={() => LiMouseDownEvent(val)}
                  title={val.fullname.join("/")}
                >
                  {val.name}
                </li>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};
