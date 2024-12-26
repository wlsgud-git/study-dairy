import { dic } from "../data/dict.js";

export async function getDict(req, res) {
  try {
    let id = req.query["id"];
    let data = await dic.getDict(id);

    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}
export async function createDict(req, res) {
  try {
    let data = await dic.createDict(req.body);
    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}
export async function modifyDict(req, res) {
  try {
    let data = await dic.modifyDict(req.body);
    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}

export async function deleteDict(req, res) {
  try {
    let id = req.query.id;
    let dic_type = req.query.dic_type;
    let data = await dic.deleteDict(id, dic_type);
    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}

// file
export async function searchDict(req, res) {
  try {
    let query = req.query["s"];
    let data = await dic.searchDict(query, "file");

    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}

export async function getFile(req, res) {
  try {
    let id = req.query["id"];
    let data = await dic.getFileById(id);

    // res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}

// file_list
export async function getFileList(req, res) {
  const list = await dic.getFileList();

  return res.status(200).json({ list });
}

export async function insertFileList(req, res) {
  const data = await dic.insertFileList(req.body);
  return res.status(200).json({ data });
}

export async function deleteFileList(req, res) {
  let name = req.query["name"];
  let nidx = req.query["nidx"];

  const response = await dic.deleteFileList(name, nidx);

  return res.status(200).json({ message: "삭제완료" });
}
