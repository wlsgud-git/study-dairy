import React, { useState, useEffect, useReducer, useRef, memo } from "react";

import { Rbtree } from "../middleware/dict.js";
import { Form } from "../middleware/form.js";

import "../css/dict.css";
import { useStatus } from "../context/status";

let form = new Form();

// 파일/폴더 생성박스
export const CreateBox = ({ data, pn, setpn }) => {
  let { dictControl, createBoxControl, FolInfo } = useStatus();
  let [Input, setInput] = useState("");
  let inputRef = useRef(null);

  function submitEvent(e) {
    if (!form.inputValidate("post", pn, Input)) {
      setInput("");
      createBoxControl(0, { id: data.id });
      return;
    }

    let info = {
      fullname: [...data.fullname, Input],
      name: Input,
      folder_id: data.id,
      parent_fullname: data.fullname,
      dic_type: "folder",
    };

    dictControl("post", form.forming(info), pn, setpn);
  }

  return (
    <div id={`folder${data.id}`} className="create_box">
      <span></span>
      <form
        className="create_form"
        onSubmit={(e) => {
          e.preventDefault();
          inputRef.current.blur();
        }}
      >
        <input
          val={Input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          onBlur={submitEvent}
        />
      </form>
    </div>
  );
};

// 파일/폴더 박스
export const Dictionary = React.memo(({ data, pn, setpn }) => {
  // console.log(`render ${data.name}`);
  let { dictControl, changeFolId, createBoxControl } = useStatus();

  let MenuRef = useRef(null);
  // 수정인풋 활성화 상태와 값
  let InputRef = useRef(null);
  let [Input, setInput] = useState({
    state: false,
    value: data.name,
  });
  // 메뉴 활성화
  let [Menu, setMenu] = useState(false);

  // 자식 사전 관련
  let [Child, setChild] = useState({ node: new Rbtree(), arr: [] });
  // 자식 사전 display여부
  let [IsOpen, setIsOpen] = useState(false);

  //폴더일 경우 자식 사전 가져오기
  useEffect(() => {
    if (data.dic_type == "file") return;

    let datas = async () => {
      await dictControl("get", data, Child, setChild);
    };
    datas();
  }, []);

  // 메뉴창 오픈시 처음 포커싱
  useEffect(() => {
    if (Menu) MenuRef.current.focus();
  }, [Menu]);

  // 수정창 활성화 후 포커싱
  useEffect(() => {
    if (Input.state) InputRef.current.focus();
  }, [Input.state]);

  // 이름 변경후 자식사전들 full_name변경
  useEffect(() => {
    if (!Child.arr.length) return;

    setChild((c) => ({
      ...c,
      arr: c.arr.map((val) => ({
        ...val,
        info: {
          ...val.info,
          fullname: [...data.fullname, val.info.name],
        },
      })),
    }));
  }, [data.fullname]);

  // 사전 클릭시
  function mouseDownEvent(e) {
    e.stopPropagation();

    if (data.dic_type == "folder") changeFolId(data.id);

    if (e.buttons == 1) {
      if (data.dic_type == "folder") {
        setIsOpen(!IsOpen);
      }
    } else {
      e.preventDefault();
      setMenu(!Menu);
    }
  }

  // 사전 이름 변경시
  function submitEvent(e) {
    if (!Input.state) return;
    if (Input.value == data.name) return;
    data.fullname[data.fullname.length - 1] = Input.value;

    let info = {
      id: data.id,
      fullname: [...data.fullname],
      name: Input.value,
      dic_type: data.dic_type,
      old_name: data.name,
    };

    dictControl("put", form.forming(info), pn, setpn);
  }

  // 메뉴 버튼 클릭시
  function MenuEvent(e) {
    let event = e.target.innerText;

    e.preventDefault();
    e.stopPropagation();

    switch (event) {
      case "파일생성":
        createBoxControl(1, { type: false });
        setIsOpen(!IsOpen);
        break;
      case "폴더생성":
        createBoxControl(1, { type: true });
        setIsOpen(!IsOpen);
        break;
      case "이름변경":
        setInput((c) => ({ ...c, state: true }));
        break;
      default:
        dictControl("delete", data, pn, setpn);
        break;
    }
  }

  return (
    <li className="dictionary">
      {/* dictionary main */}
      <div
        className="dictionary_main"
        title={data.fullname.join("/")}
        onMouseDown={mouseDownEvent}
      >
        {data.dic_type == "folder" ? (
          <span>
            <i
              className={`fa-solid fa-chevron-${IsOpen ? "down" : "right"}`}
            ></i>
          </span>
        ) : (
          ""
        )}
        <div className="dictionary_content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              InputRef.current.blur();
            }}
          >
            <input
              type="text"
              ref={InputRef}
              style={{ cursor: !Input.state ? "default" : "" }}
              value={Input.value}
              onChange={(e) =>
                setInput((c) => ({ ...c, value: e.target.value }))
              }
              onBlur={submitEvent}
              spellCheck={false}
              readOnly={!Input.state}
            />
          </form>
        </div>
      </div>

      {/* dictionary menu */}
      <div
        className="dict_menu"
        tabIndex="0"
        ref={MenuRef}
        style={{ display: Menu ? "flex" : "none" }}
        onBlur={() => setMenu(!Menu)}
      >
        {data.dic_type == "folder" ? (
          <button onMouseDown={MenuEvent}>파일생성</button>
        ) : (
          ""
        )}
        {data.dic_type == "folder" ? (
          <button onMouseDown={MenuEvent}>폴더생성</button>
        ) : (
          ""
        )}
        <button onMouseDown={MenuEvent}>이름변경</button>
        <button onMouseDown={MenuEvent}>삭제</button>
      </div>

      {/* dictionary child */}
      {data.dic_type == "folder" ? (
        <div
          className="childs_list"
          style={{ display: IsOpen ? "flex" : "none" }}
        >
          <CreateBox data={data} pn={Child} setpn={setChild} />
          {Child.arr.length
            ? Child.arr.map((val) => (
                <Dictionary
                  key={`${val.info.dic_type}${val.info.id}`}
                  data={val.info}
                  pn={Child}
                  setpn={setChild}
                />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </li>
  );
});
