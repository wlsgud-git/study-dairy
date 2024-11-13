import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  let [WindowSize, setWindowSize] = useState(window.innerWidth);
  let [Darkmode, setDarkmode] = useState(false);
  let [DicInfo, setDicInfo] = useState({
    id: 0,
    inputState: false,
    // 폴더는 true 파일은 false
    dic: true,
  });

  let [Menu, setMenu] = useState({
    menu: true,
    focusing: true,
    adapt: false,
    display: true,
  });

  function dicStatus(dic) {
    setDicInfo((c) => ({ ...c, inputState: !DicInfo.inputState, dic: dic }));
  }

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
    }),
    [Darkmode, Menu, DicInfo]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
