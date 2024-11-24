import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FolderService } from "../service/folder";

export const StatusContext = createContext();

export const StatusProvider = ({ folderService, fileService, children }) => {
  // 사전관련 --------------------------------------------------------
  let [FolInfo, setFolInfo] = useState({
    id: 0,
    create: false,
    dic: true,
    modify: false,
  });
  let [FiInfo, setFiInfo] = useState({ id: 0 });

  const getDict = useCallback(
    async (id) => {
      let result = [];
      let fol = await folderService.getFolderDetail(id);
      let fi = await fileService.getFileDetail(id);

      fol.map((val) => result.push(val));
      fi.map((val) => result.push(val));
      return result;
    },
    [folderService, fileService]
  );

  const createDict = useCallback(
    async (data, dic) => {
      let res = dic
        ? await folderService.createFolder(data)
        : await fileService.createFile(data);
      return res;
    },
    [folderService, fileService]
  );

  const currentFol = (id) => setFolInfo((c) => ({ ...c, id: id }));
  const folderCreate = (dic = false) =>
    setFolInfo((c) => ({ ...c, create: !FolInfo.create, dic: dic }));

  useEffect(() => {
    if (FolInfo.create) {
      let node = document.querySelector(".sd-folder_list_container");
      let nodeInput = node.children[FolInfo.id].querySelector(".sd-post_input");
      nodeInput.focus();
    }
  }, [FolInfo.create]);

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
      FolInfo,

      getDict,
      createDict,
      currentFol,
      folderCreate,
    }),
    [Darkmode, Menu, FolInfo]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
