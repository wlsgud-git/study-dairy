import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";

import { Dictionary, CreateBox } from "./dict.js";
import { Rbtree } from "../middleware/dict.js";
import "../css/menu.css";

export const DictList = () => {
  let { dictControl, changeFolId } = useStatus();
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
    <div className="dictionary_lists" onMouseDown={() => changeFolId(0)}>
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
