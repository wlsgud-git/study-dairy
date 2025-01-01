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
    index: 0,
    list: [],
  });

  const returnDictInfo = async (action, data) => {
    let res;
    switch (action) {
      case "get":
        res = await dictService.getDictDetail(data.id);
        break;
      case "post":
        res = await dictService.createDict(data);
        break;
      case "put":
        res = await dictService.modifyDict(data);
        break;
      default:
        let dd = JSON.parse(data);
        res = await dictService.deleteDict(dd);
        break;
    }
    let newData = await res.data;
    return { res, newData };
  };

  const DictCrud = useCallback(
    async (action, pn, setpn, data) => {
      let { res, newData } = await returnDictInfo(action, data);

      if (action == "delete" || action == "put") {
        manageFileList(
          action,
          JSON.parse(action == "put" ? data.get("modify_data") : data),
          newData
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
    [dictService, FileList.list]
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

  const currentIndex = (index) => {
    setFileList((c) => ({ ...c, index: index }));
    menuFocusing(false);
  };

  const manageFileList = useCallback(
    async (action, info, newInfo = undefined) => {
      let tf = false;

      if (FileList.list.length == 0) tf = true;
      for (var i = 0; i < FileList.list.length; i++) {
        let val = FileList.list[i];
        if (action == "insert") {
          if (info.id == val.id) {
            tf = false;
            currentIndex(i);
            return;
          } else tf = true;
        } else if (
          (action == "put" || action == "delete") &&
          val.full_name[info.nidx - 1] == info.name
        ) {
          tf = true;
        }
      }

      if (!tf) return;
      handleFileList(action, info, newInfo);
    },
    [FileList.list]
  );

  const handleFileList = useCallback(
    async (action, info, newInfo) => {
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
        let newName = newInfo[0].name;
        formData.append("nidx", info.nidx);
        formData.append("dic_type", info.dic_type);
        formData.append("old_name", info.name);
        formData.append("new_name", newName);
        await dictService
          .modifyFileList(formData)
          .then((li) =>
            setFileList((c) => ({
              ...c,
              list: c.list.map((val) =>
                val.full_name[info.nidx - 1] == info.name
                  ? {
                      ...val,
                      full_name: val.full_name.map((value, index) =>
                        index == info.nidx - 1 ? newName : value
                      ),
                      name:
                        info.nidx == val.full_name.length ? newName : val.name,
                    }
                  : val
              ),
            }))
          )
          .catch((err) => alert(err));
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
      returnDictInfo,
      manageFileList,
      handleFileList,
      currentIndex,
    }),
    [Darkmode, Menu, FolInfo, FiInfo, FileList]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
