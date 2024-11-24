import { fol } from "../data/folder.js";

export async function getFolders(req, res) {
  try {
    let fid = req.query["fid"];
    let data = await fol.getFolders(fid);
    return res.status(200).json(data);
  } catch (err) {
    throw err;
  }
}
export async function createFolder(req, res) {
  try {
    let response = await fol.createFolder(req.body);

    return res.status(201).json({ data: response });
  } catch (err) {
    throw err;
  }
}
export async function modifyFolder() {}
export async function deleteFolder() {}
