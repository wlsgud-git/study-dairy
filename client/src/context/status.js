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
  let [FileList, setFileList] = useState({
    index: -1,
    list: [],
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
        manageFileList(
          action,
          action == "put" ? JSON.parse(data.get("modify_data")) : data
        );
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
    [dictService, FileList]
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

  useEffect(() => {
    let list = async () => {
      await dictService
        .getFileList()
        .then((li) =>
          setFileList((c) => ({ ...c, list: li.list.map((val) => val) }))
        )
        .catch((err) => alert(err));
    };
    list();
  }, []);

  const manageFileList = useCallback(
    async (action, info) => {
      let tf = true;
      FileList.list.map((val, index) => {
        if (action == "insert" && info.id == val.id) {
          setFileList((c) => ({ ...c, index: index }));
          tf = false;
          return;
        } else if (
          (action == "put" || action == "delete") &&
          val.full_name[info.nidx - 1] == info.name
        ) {
          return;
        }
        if (action !== "insert" && index == FileList.list.length - 1)
          tf = false;
      });

      if (!tf) return;
      handleFileList(action, info);
    },
    [FileList.list]
  );

  const handleFileList = useCallback(
    async (action, info) => {
      let formData = new FormData();
      if (action == "insert") {
        let data = await dictService.getFile(info.id);
        for (const key in data.data[0]) {
          if (key == "full_name")
            info["full_name"].forEach((val) =>
              formData.append("full_name[]", val)
            );
          else formData.append(key, data.data[0][key]);
        }
        await dictService
          .insertFileList(formData)
          .then((data) =>
            setFileList((c) => ({
              ...c,
              index: FileList.list.length,
              list: [...c.list, data.data[0]],
            }))
          )
          .catch((err) => alert(err));
      } else if (action == "put") {
      } else {
        await dictService
          .deleteFileList(info.name, info.nidx)
          .then((li) => {
            setFileList((c) => ({
              ...c,
              index: 0,
              list: c.list.filter(
                (val) => val.full_name[info.nidx - 1] !== info.name
              ),
            }));
          })
          .catch((err) => alert(err));
      }
    },
    [FileList.list]
  );

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

      // file list
      FileList,
      manageFileList,
      handleFileList,
    }),
    [Darkmode, Menu, FolInfo, FiInfo, FileList]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
