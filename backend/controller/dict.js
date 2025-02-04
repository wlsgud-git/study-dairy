import { dic } from "../data/dict.js";

export async function getDict(req, res, next) {
  try {
    let id = req.query["id"];
    let data = await dic.getDicts(id);

    return res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function SearchFile(req, res) {
  try {
    let q = req.query["q"];
    let arr = await dic.searchFile(q);

    return res.status(200).json({ arr });
  } catch (err) {
    throw err;
  }
}

export async function createDict(req, res) {
  try {
    let data = await dic.createDict(req.body);
    return res.status(201).json({ data });
  } catch (err) {
    throw err;
  }
}

export async function updateDict(req, res) {
  try {
    let data = await dic.updateDict(req.body);
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
