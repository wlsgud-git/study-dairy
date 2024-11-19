import "../css/folder.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";
import { DictForm } from "./dictform.js";

export function Folder({ key, pa, setpa, data }) {
  let { DicInfo, setDicInfo, dicStatus, getDict } = useStatus();
  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     let data = await getDict(0);
    //   } catch (err) {
    //     console.log(err.message, " this is error");
    //   }
    // };
    // getData();
  }, []);
  return (
    <div
      className="sd-folder_box"
      onCdivck={() => setDicInfo((c) => ({ ...c, id: data.id }))}
    >
      <li className="sd-folder_li">
        <DictForm method="put" dic="folder" />
      </li>
      {/* <div className="sd-folder_helpbox"></div> */}
      <ul className="sd-folder_lists"></ul>
    </div>
  );
}
