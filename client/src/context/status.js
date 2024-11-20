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
    handle: true,
  }); // 폴더 생성
  let [Menu, setMenu] = useState({
    menu: true,
    focusing: true,
    adapt: false,
    display: true,
  }); // 메뉴창

  // 메뉴관련
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

  // 폴더관련
  const currentFolder = (id) => setDicInfo((c) => ({ ...c, id: id }));

  // 다크모드 관련
  const changeMode = () => setDarkmode(!Darkmode);
  useEffect(() => {
    document.body.dataset.theme = Darkmode ? "dark" : "light";
  }, [Darkmode]);

  // 최상위 폴더/파일 가져오는 함수
  const getDict = useCallback(
    async (fid) => {
      let fol = await folderService.getFolders(fid);
      let fi = await fileService.getFiles(fid);
      return [fol, fi];
    },
    [folderService, fileService]
  );

  // useEffect
  // 사전 생성시 해당 폴더의 인풋에 포커스 이벤트
  // useEffect(() => {
  //   const node = document.querySelector(".sd-folder_list_container");
  //   let nodeChild = node.children[DicInfo.id];
  //   let nodeInput = nodeChild.querySelector(
  //     `.${DicInfo.handle ? "sd-dict_put_input" : "sd-dict_post_input"}`
  //   );

  //   if (DicInfo.inputState) nodeInput.focus();
  // }, [DicInfo.inputState]);

  // 윈도우 사이즈가 바뀔때
  useEffect(() => menuAdapt, [WindowSize]);

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
      // darkmode
      Darkmode,

      changeMode,

      // menu
      Menu,

      menuFocusing,
      menuMenu,

      // dicinfo
    }),
    [Darkmode, Menu, DicInfo]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
