import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Rbtree } from "../middleware/dict";

export const StatusContext = createContext();

export const StatusProvider = ({ dictService, children }) => {
  // 사전관련 -------------------------------------------------------
  let [FolInfo, setFolInfo] = useState({
    id: 0,
    create: false,
    dic: true,
    modify: false,
  });

  const DictCrud = useCallback(
    async (action, pn, setpn, data) => {
      let res;
      let newData;

      if (action == "get" || action == "post" || action == "put") {
        switch (action) {
          case "get":
            res = await dictService.getDictDetail(data);
            newData = await res.data;
            break;
          case "post":
            res = await dictService.createDict(data);
            newData = await res.data;
            break;
          default:
            res = await dictService.modifyDict(data);
            newData = await res.data;
            break;
        }

        if (action == "put") {
          let dd = JSON.parse(data.get("modify_data"));

          let del_name =
            dd.dic_type == "file" ? "힣힣힣힣힣" + dd.name : dd.name;
          pn.node.delete(del_name);
        }
        newData.map((val) => {
          let ar = pn.node.insert(val.name, val);
          if (ar) setpn((c) => ({ ...c, data: [...c.data, ar] }));
        });
      } else {
        let dd = JSON.parse(data);
        res = await dictService.deleteDict(dd);
        let ar = pn.node.delete(
          dd.dic_type == "file" ? "힣힣힣힣힣" + dd.name : dd.name
        );
        if (ar) setpn((c) => ({ ...c, data: [...c.data, ar] }));
      }
    },
    [dictService]
  );

  // 폴더 이벤트
  const currentFol = (id) => setFolInfo((c) => ({ ...c, id: id }));
  const folderCreate = (dic = false) =>
    setFolInfo((c) => ({ ...c, create: !FolInfo.create, dic: dic }));
  const folderModify = () =>
    setFolInfo((c) => ({ ...c, modify: !FolInfo.modify }));

  useEffect(() => {
    if (FolInfo.create) {
      let node = document.getElementById(`folder_post${FolInfo.id}`);
      node.focus();
    }
  }, [FolInfo.create]);
  useEffect(() => {
    console.log("folinfo.modify:", FolInfo.modify);
    if (FolInfo.modify) {
      let node = document.getElementById(`folder_put${FolInfo.id}`);
      node.focus();
    }
  }, [FolInfo.modify]);

  // 파일변환
  let [FiInfo, setFiInfo] = useState({
    id: 0,
    modify: false,
    node: new Rbtree(),
    data: [[]],
  });
  const currentFi = (id) => setFiInfo((c) => ({ ...c, id: id }));
  const fileModify = () => setFiInfo((c) => ({ ...c, modify: !FiInfo.modify }));
  const currentFileEvent = (event) => {
    console.log(event);
  };

  useEffect(() => {
    console.log("FiInfo.modify:", FiInfo.modify);
    if (FiInfo.modify) {
      let node = document.getElementById(`file_put${FiInfo.id}`);
      node.focus();
    }
  }, [FiInfo.modify]);

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

      // folder
      FolInfo,
      currentFol,
      folderCreate,
      folderModify,

      // file
      FiInfo,
      currentFi,
      fileModify,
      currentFileEvent,
    }),
    [Darkmode, Menu, FolInfo, FiInfo]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
