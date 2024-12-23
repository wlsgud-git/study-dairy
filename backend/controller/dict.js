import { dic } from "../data/dict.js";

export async function searchDict(req, res) {
  try {
    let query = req.query["s"];
    let data = [];
    let fol = await dic.searchDict(query, "folder");
    let fi = await dic.searchDict(query, "file");

    fol.map((val) => data.push(val));
    fi.map((val) => data.push(val));
    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
}

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
