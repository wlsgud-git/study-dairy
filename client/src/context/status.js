import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Rbtree } from "../middleware/dict.js";

export const StatusContext = createContext();

export const StatusProvider = ({ dictService, children }) => {
  // 사전관련 -------------------------------------------------------
  let [FolInfo, setFolInfo] = useState({
    id: 0,
    create: false,
    dic: false,
  });

  const DictCrud = useCallback(
    async (action, pn, setpn, data) => {
      let res;
      let newData;

      // 백엔드에서 데이터 처리후 값
      switch (action) {
        case "get":
          res = await dictService.getDictDetail(data.id);
          newData = await res.data;
          break;
        case "post":
          res = await dictService.createDict(data);
          newData = await res.data;
          break;
        case "put":
          res = await dictService.modifyDict(data);
          newData = await res.data;
          break;
        default:
          let dd = JSON.parse(data);
          res = await dictService.deleteDict(dd);
          newData = await res.data;
          break;
      }

      if (action == "delete" || action == "put") {
        newData.map((val) => {
          let ar = pn.node.delete(
            action == "put" ? JSON.parse(data.get("modify_data")) : val
          );
          if (ar) setpn((c) => ({ ...c, arr: ar.map((val) => val) }));
        });
        if (action == "delete") return;
      }

      newData.map((val) => {
        let ar = pn.node.insert(val);
        if (ar) setpn((c) => ({ ...c, arr: ar.map((val) => val) }));
      });
    },
    [dictService]
  );

  const SearchDict = useCallback(
    async (text) => {
      const response = await dictService.searchDict(text);

      try {
        return await response.data;
      } catch (err) {
        throw err;
      }
    },
    [dictService]
  );

  // 폴더 이벤트
  const currentFol = (id) => setFolInfo((c) => ({ ...c, id: id }));
  const folderCreate = (dic = false) =>
    setFolInfo((c) => ({ ...c, create: !FolInfo.create, dic: dic }));

  useEffect(() => {
    if (FolInfo.create) {
      let node = document.getElementById(`folder_post${FolInfo.id}`);
      node.focus();
    }
  }, [FolInfo.create]);

  // 파일변환
  let [FiInfo, setFiInfo] = useState({ id: 0 });

  const currentFi = (id) => setFiInfo((c) => ({ ...c, id: id }));

  // 메뉴관련 ------------------------------------------
  let [Menu, setMenu] = useState({
    menu: true,
    focusing: true,
    adapt: false,
    display: true,
  });
  const menuFocusing = (tf = undefined) =>
    setMenu((c) => ({ ...c, focusing: tf !== undefined ? tf : !Menu.menu }));
  const menuMenu = () =>
    setMenu((c) => ({
      ...c,
      menu: Menu.adapt ? true : !Menu.menu,
    }));
  const menuAdapt = () =>
    setMenu((c) => ({ ...c, adapt: WindowSize <= 640 ? true : false }));

  useEffect(() => {
    setMenu((c) => ({ ...c, display: Menu.adapt ? Menu.focusing : Menu.menu }));
  }, [Menu.menu, Menu.adapt, Menu.focusing]);

  // 다크모드 관련 ------------------------------------------
  let [Darkmode, setDarkmode] = useState(false);
  const changeMode = () => setDarkmode(!Darkmode);
  useEffect(() => {
    document.body.dataset.theme = Darkmode ? "dark" : "light";
  }, [Darkmode]);

  // 윈도우 사이즈 ------------------------------------------
  let [WindowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => menuAdapt, [WindowSize]);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setWindowSize(window.innerWidth)
      );
    };
  }, []);

  // 상태 업데이트 값
  // useEffect(() => {
  //   console.log("current_folder_id", FolInfo.id);
  //   console.log("current_file_id", FiInfo.id);
  //   console.log("menu focusing", Menu.focusing);
  //   console.log("folder_inputstate", FolInfo.create);
  // }, [FolInfo.id, FiInfo.id, Menu.focusing, FolInfo.create]);

  // 결과값 ------------------------
  let value = useMemo(
    () => ({
      // darkmode
      Darkmode,

      changeMode,

      // menu
      Menu,

      menuFocusing,
      menuMenu,

      // dictionary
      DictCrud,
      SearchDict,

      // folder
      FolInfo,
      currentFol,
      folderCreate,

      // file
      FiInfo,
      currentFi,
    }),
    [Darkmode, Menu, FolInfo, FiInfo]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
