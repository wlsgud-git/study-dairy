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

  let [Menu, setMenu] = useState({
    menu: true,
    focusing: true,
    adapt: "",
    display: [true, true],
  });

  useEffect(() => {
    if (WindowSize <= 640) {
      setMenu((c) => ({
        ...c,
        adapt: false,
        menu: Menu.focusing,
        display: Menu.focusing ? [true, false] : [false, true],
      }));
    } else {
      setMenu((c) => ({
        ...c,
        adapt: true,
        display: Menu.menu ? [true, true] : [false, true],
      }));
    }
  }, [WindowSize, Menu]);

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

      // set variable function
      setDarkmode,
      setMenu,

      // use function
    }),
    [Darkmode, Menu]
  );

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
