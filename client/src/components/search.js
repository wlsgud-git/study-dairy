import React, { memo, useEffect, useState } from "react";
import "../css/search.css";
import { useStatus } from "../context/status";

// const Search = React.memo(() => {
//   return <div className="search_container"></div>;
// });

export const Search = () => {
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
                <li className="file_li" title={val.fullname.join("/")}>
                  {val.name}
                </li>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};
