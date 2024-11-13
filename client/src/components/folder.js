import { useStatus } from "../context/status.js";

function Folder() {
  let { CurId, setCurId } = useStatus();
  return <li className="sd-folder" onClick={() => setCurId()}></li>;
}
