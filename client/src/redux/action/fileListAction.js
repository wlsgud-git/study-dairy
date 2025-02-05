import { useStatus } from "../../context/status";

export const getFileList = () => async (dispatch) => {
  let { FileListControl } = useStatus();
  try {
    const list = await FileListControl("get");
    console.log("action result:", list);
  } catch (err) {
    throw err;
  }
};

// export const getFileList = () => async (dispatch) => {
//     let { FileListControl } = useStatus();
//     try {
//       const list = await FileListControl("get");
//       console.log("action result:", list);
//     } catch (err) {
//       throw err;
//     }
//   };
