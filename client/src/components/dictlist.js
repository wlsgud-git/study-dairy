// css
import "../css/menu.css";

// middleware
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// other file
import { useStatus } from "../context/status.js";
import { Dictionary, CreateBox } from "./dict.js";
import { Rbtree } from "../middleware/dict.js";
import { changeId } from "../redux/reducer/dictSlice.js";

export const DictList = () => {
  let { dictControl } = useStatus();
  let dispatch = useDispatch();
  let [Child, setChild] = useState({ node: new Rbtree(), arr: [] });
  let [data, setdata] = useState({ id: 0, fullname: [] });

  // 자식 사전가져오기
  useEffect(() => {
    let datas = async () => {
      await dictControl("get", data, Child, setChild);
    };
    datas();
  }, []);

  return (
    <div
      className="dictionary_lists"
      onMouseDown={() => dispatch(changeId({ id: data.id, type: true }))}
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
  );
};
