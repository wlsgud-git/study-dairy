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
export async function modifyFile() {}
export async function deleteFile() {}
