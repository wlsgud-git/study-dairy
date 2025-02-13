import { dic } from "../data/dict.js";
import { fileList } from "../data/fileList.js";
import { S3FileControl } from "../middleware/aws.js";

// 사전
export async function getDict(req, res, next) {
  try {
    let id = req.query["id"];
    let data = await dic.getDicts(id);

    return res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}

// 파일 가져오기
export async function getFile(req, res) {
  try {
    let id = req.query["id"];
    let data = await dic.getFile(id);
    return res.status(200).json({ data });
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
    console.log(req.body);
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

// 검색
export const SearchFile = async (req, res) => {
  try {
    let q = req.query["q"];
    let arr = await dic.searchFile(q);

    return res.status(200).json({ arr });
  } catch (err) {
    throw err;
  }
};

// 이미지 업로드
export const ImgUpload = async (req, res) => {
  let s3 = new S3FileControl();
  let file = req.file;
  let data = {
    key: file.originalname,
    file,
  };
  try {
    let src = await s3.s3FileUpload(data);
    return res.status(201).json({ key: file.originalname, src });
  } catch (err) {
    throw err;
  }
};

// 파일 리스트
export const getFileList = async (req, res) => {
  try {
    const data = await fileList.getFileList();
    return res.status(200).json({ data });
  } catch (err) {
    throw err;
  }
};

export const addFileList = async (req, res) => {
  try {
    const data = await fileList.addFileList(req.body);
    return res.status(201).json({ data });
  } catch (err) {
    throw err;
  }
};

export const deleteFileList = async (req, res) => {
  let id = req.query["id"];
  try {
    const data = await fileList.deleteFileList(id);
    return res.status(204).json({ data });
  } catch (err) {
    throw err;
  }
};
