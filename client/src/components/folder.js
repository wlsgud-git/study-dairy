import { useStatus } from "../context/status.js";

function Folder() {
  let { CurId, setCurId, getDict } = useStatus();
  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getDict(0);
      } catch (err) {
        console.log(err.message, " this is error");
      }
    };
    getData();
  });
  return <li className="sd-folder" onClick={() => setCurId()}></li>;
}
