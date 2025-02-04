import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Rbtree } from "../middleware/dict.js";

export const StatusContext = createContext();

export const StatusProvider = ({ dictService, children }) => {
  // 폴더 관련
  let FolId = useRef(0);
  const changeFolId = (id) => (FolId.current = id);
  const createBoxControl = (action, payload) => {
    let node = document.getElementById(
      `folder${payload.id !== undefined ? payload.id : FolId.current}`
    );
    let nodeInput = node.querySelector("input");
    if (!action) node.style.display = "none";
    else {
      node.style.display = "flex";
      nodeInput.focus();

      node.querySelector("span").innerHTML = `<i class="fa-solid fa-${
        payload.type ? "folder" : "file"
      }"></i>`;
    }
  };

  // 사전 crud
  const dictControl = useCallback(
    async (action, info, pn, setpn) => {
      let res;
      let data;
      switch (action) {
        case "get":
          res = await dictService.getLists(info.id);
          data = await res.data;
          break;
        case "post":
          res = await dictService.insertDict(info);
          data = await res.data;
          break;
        case "put":
          res = await dictService.updateDict(info);
          data = await res.data;
          break;
        default:
          res = await dictService.deleteDict(info);
          data = await res.data;
          break;
      }

      if (action == "put" || action == "delete") {
        let ar = pn.node.delete(
          action == "put"
            ? { dic_type: info.get("dic_type"), name: info.get("old_name") }
            : info
        );
        if (action == "delete" && ar) {
          setpn((c) => ({ ...c, arr: ar.map((val) => val) }));
          changeFolId(0);
          return;
        }
      }

      data.map((val) => {
        let ar = pn.node.insert(val);
        if (ar) setpn((c) => ({ ...c, arr: ar.map((val) => val) }));
      });
    },
    [dictService]
  );

  // 파일 검색
  const searchFile = useCallback(
    async (text) => {
      try {
        let result = await dictService.search(text);
        return result;
      } catch (err) {
        throw err;
      }
    },
    [dictService]
  );

  // 결과값 ------------------------
  let value = useMemo(
    () => ({
      // folder
      FolId,
      changeFolId,
      createBoxControl,

      // search
      searchFile,

      // dictionary
      dictControl,
    }),
    []
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
