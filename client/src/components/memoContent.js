import react, { useEffect, useRef, useState } from "react";
import { useStatus } from "../context/status.js";

export function MemoContent() {
  let { FiInfo } = useStatus();

  return <div className="sd-memo_container"></div>;
}
