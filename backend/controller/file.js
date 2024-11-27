import { fi } from "../data/file.js";

export async function getFiles(req, res) {
  try {
    let fid = req.query["fid"];
    let data = await fi.getFiles(fid);
    return res.status(200).json(data);
  } catch (err) {
    throw err;
  }
}
export async function createFile(req, res) {
  try {
    let response = await fi.createFile(req.body);
    return res.status(201).json({ data: response });
  } catch (err) {
    throw err;
  }
}
export async function modifyFile(req, res) {
  try {
    let response = await fi.modifyFile(req.body);
    return res.status(200).json({ data: response });
  } catch (err) {
    throw err;
  }
}
export async function deleteFile(req, res) {
  try {
    let { id } = req.params;
    let response = await fi.deleteFile(id);
    return res.status(200).json({ message: "파일삭제 완료" });
  } catch (err) {
    throw err;
  }
}
