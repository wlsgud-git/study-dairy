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
  } catch (err) {}
}
export async function modifyFile() {}
export async function deleteFile() {}
