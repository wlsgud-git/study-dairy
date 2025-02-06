// css
import "../css/dict.css";

// middleware
import React, { useState, useEffect, useReducer, useRef, memo } from "react";
import { emitter } from "../middleware/eventBus.js";
import { useDispatch } from "react-redux";

// use middleware
import { Rbtree } from "../middleware/dict.js";
import { Form } from "../middleware/form.js";
import { changeId } from "../redux/reducer/dictSlice.js";
import {
  addFileList,
  deleteFileList,
  getFileList,
  modifyList,
} from "../redux/action/fileListAction.js";
// context;
import { useStatus } from "../context/status";

let form = new Form();

// 파일/폴더 생성박스
export const CreateBox = ({ data, pn, setpn }) => {
  let { dictControl } = useStatus();
  let [Input, setInput] = useState({
    value: "",
    state: false,
    dic_type: false,
  });
  let inputRef = useRef(null);

  // 사전 생성 함수
  function submitEvent(e) {
    if (!form.inputValidate("post", pn, Input.value)) {
      setInput((c) => ({ ...c, state: false, value: "" }));
      return;
    }

    let info = {
      fullname: [...data.fullname, Input.value],
      name: Input.value,
      folder_id: data.id,
      parent_fullname: data.fullname,
      dic_type: Input.dic_type ? "folder" : "file",
    };

    try {
      dictControl("post", form.forming(info), pn, setpn);
      setInput((c) => ({ ...c, state: false, value: "" }));
    } catch (err) {}
  }

  // 폴더 및 파일 생성 클릭시 자식 사전이 open상태가 됨
  useEffect(() => {
    const handler = (dic_type) =>
      setInput((c) => ({ ...c, state: true, dic_type }));
    emitter.on(`create${data.id}`, handler);
    return () => emitter.off(`create${data.id}`, handler);
  }, []);

  // 인풋 상태가 활성화되면 focusing을 줌
  useEffect(() => {
    if (Input.state) {
      emitter.emit(`child${data.id}`, true);
      inputRef.current.focus();
    }
  }, [Input.state]);

  return (
    <div
      id={`folder${data.id}`}
      className="create_box"
      style={{ display: Input.state ? "flex" : "none" }}
    >
      <span>
        <i className={`fa-solid fa-${Input.dic_type ? "folder" : "file"}`}></i>
      </span>
      <form
        className="create_form"
        onSubmit={(e) => {
          e.preventDefault();
          inputRef.current.blur();
        }}
      >
        <input
          value={Input.value}
          ref={inputRef}
          onChange={(e) => setInput((c) => ({ ...c, value: e.target.value }))}
          spellCheck={false}
          onBlur={submitEvent}
        />
      </form>
    </div>
  );
};

// 파일/폴더 박스
export const Dictionary = React.memo(({ data, pn, setpn }) => {
  let dispatch = useDispatch();
  let { dictControl, createBoxControl } = useStatus();

  // 현재 내 사전 ------------------------------------------------------------------------------
  // 사전 클릭시
  function mouseDownEvent(e) {
    e.stopPropagation();

    // 사전 ID변환
    dispatch(
      changeId({ id: data.id, type: data.dic_type == "file" ? false : true })
    );

    // 마우스 좌우 클릭시 이벤트
    if (e.buttons == 1) {
      data.dic_type == "file"
        ? dispatch(
            addFileList(form.forming({ id: data.id, fullname: data.fullname }))
          )
        : setIsOpen(!IsOpen);
    } else {
      e.preventDefault();
      setMenu(!Menu);
    }
  }

  // 자식 사전 ------------------------------------------------------------------------------
  let [Child, setChild] = useState({ node: new Rbtree(), arr: [] }); // 자식 사전 관련
  let [IsOpen, setIsOpen] = useState(false); // 자식 사전 display여부
  //폴더일 경우 자식 사전 가져오기
  useEffect(() => {
    if (data.dic_type == "file") return;

    let datas = async () => {
      await dictControl("get", data, Child, setChild);
    };
    datas();
  }, []);

  // 자식 사전 강제로 보이게
  useEffect(() => {
    const handler = (newState) => setIsOpen(newState);
    emitter.on(`child${data.id}`, handler);
    return () => emitter.off(`child${data.id}`, handler);
  }, []);

  // 사전 이름수정 ------------------------------------------------------------------------------
  let InputRef = useRef(null);
  let [Input, setInput] = useState({
    state: false,
    value: data.name,
  });
  // 수정창 활성화 후 포커싱
  useEffect(() => {
    if (Input.state) InputRef.current.focus();
  }, [Input.state]);
  // 이름 변경후 자식사전들 full_name변경
  useEffect(() => {
    // if (data.dic_type == "file") dispatch(modifyList(data.id, data.fullname));
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

  // 이름 수정 함수
  async function submitEvent(e) {
    if (
      !form.inputValidate("put", pn, {
        new_name: Input.value,
        old_name: data.name,
      })
    ) {
      setInput((c) => ({ ...c, state: false, value: data.name }));
      return;
    }
    let previewFullname = [...data.fullname];
    previewFullname[previewFullname.length - 1] = Input.value;

    let info = {
      id: data.id,
      fullname: [...previewFullname],
      name: Input.value,
      dic_type: data.dic_type,
      old_name: data.name,
    };

    try {
      dictControl("put", form.forming(info), pn, setpn);
      setInput((c) => ({ ...c, state: false }));
      data.fullname = [...previewFullname];
      dispatch(getFileList());
    } catch (err) {
      alert(err);
    }
  }

  // 사전 메뉴 ------------------------------------------------------------------------------
  let [Menu, setMenu] = useState(false); // 메뉴 활성화
  let MenuRef = useRef(null);
  // 메뉴창 오픈시 처음 포커싱
  useEffect(() => {
    if (Menu) MenuRef.current.focus();
  }, [Menu]);

  // 메뉴 버튼 클릭시
  function MenuEvent(e) {
    let event = e.target.innerText;

    e.preventDefault();
    e.stopPropagation();

    if (event == "파일생성" || event == "폴더생성")
      emitter.emit(`create${data.id}`, event == "파일생성" ? false : true);
    else if (event == "이름변경") setInput((c) => ({ ...c, state: true }));
    else
      dictControl("delete", data, pn, setpn).then(() =>
        dispatch(getFileList())
      );
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

      {/* child dictionary */}
      <div className="child_box">
        <CreateBox data={data} pn={Child} setpn={setChild} />
        {/* dictionary child */}
        {data.dic_type == "folder" ? (
          <div
            className="childs_list"
            style={{ display: IsOpen ? "flex" : "none" }}
          >
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
      </div>
    </li>
  );
});
