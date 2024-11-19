import "../css/file.css";

import { useStatus } from "../context/status.js";
import { useRef, useState, useEffect } from "react";

export function File(key, pa, setpa, data) {
  let { CurId, setCurId, getDict } = useStatus();

  return <li className="sd-file"></li>;
}
