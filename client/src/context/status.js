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
  let [WindowSize, setWindowSize] = useState(window.innerWidth); //윈도우 사이즈
  let [Darkmode, setDarkmode] = useState(false); //다크모드
  let [DicInfo, setDicInfo] = useState({
    id: 0,
    inputState: false,
    dic: true,
  }); // 폴더 생성
  let [Menu, setMenu] = useState({
    menu: true,
    focusing: true,
    adapt: false,
    display: true,
  }); // 메뉴창

  function dicStatus(dic) {
    setDicInfo((c) => ({ ...c, inputState: !DicInfo.inputState, dic: dic }));
  }

  const getDict = useCallback(
    async (fid) => {
      let fol = await folderService.getFolders(fid);
      let fi = await fileService.getFiles(fid);
      return [fol, fi];
    },
    [folderService, fileService]
  );

  // 사전 생성시 해당 폴더의 인풋에 포커스 이벤트
  useEffect(() => {
    const node = document.querySelector(".sd-folder_list_container");
    let nodeInput = node.children[DicInfo.id].querySelector("input");

    if (DicInfo.inputState) nodeInput.focus();
  }, [DicInfo.inputState]);

  // 윈도우 사이즈가 바뀔때
  useEffect(() => {
    if (WindowSize <= 640)
      setMenu((c) => ({
        ...c,
        adapt: true,
        display: Menu.adapt ? Menu.focusing : Menu.menu,
      }));
    else
      setMenu((c) => ({
        ...c,
        adapt: false,
        display: Menu.adapt ? Menu.focusing : Menu.menu,
      }));
  }, [WindowSize]);

  // 다크모드 이벤트
  useEffect(() => {
    document.body.dataset.theme = Darkmode ? "dark" : "light";
  }, [Darkmode]);

  // 윈도우 크기조절 이벤트
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setWindowSize(window.innerWidth)
      );
    };
  }, []);

  let value = useMemo(
    () => ({
      // variable
      Darkmode,
      Menu,
      DicInfo,

      // set variable function
      setDarkmode,
      setMenu,
      setDicInfo,

      // use function
      dicStatus,
      getDict,
    }),
    [Darkmode, Menu, DicInfo, getDict]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
