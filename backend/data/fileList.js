import { dbPlay } from "../db/db.js";

class FileList {
  constructor() {}

  async getFileList() {
    let query = `select * from fileList`;
    const data = [];

    try {
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async addFileList(info) {
    let query = `insert into fileList values($1, $2) returning *`;
    const data = [info["id"], info["fullname"]];

    try {
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async deleteFileList(id) {
    let query = `delete from fileList where id = $1`;
    const data = [id];

    try {
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
}

export const fileList = new FileList();
