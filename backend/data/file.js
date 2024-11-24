import { dbPlay } from "../db/db.js";

class FileData {
  constructor() {}

  // insturucture = [id, full_name, name, folder_id]
  // get data = [full_name, name, folder_id]

  async getFiles(fid) {
    try {
      let query =
        "select * from files where id >= 1 and folder_id=$1 order by name asc";
      let data = [fid];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async createFile(info) {
    try {
      let query =
        "insert into files values(default, $1, $2, default, default, default, $3) returning *";
      const data = [info["full_name"], info["name"], info["folder_id"]];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyFile() {}
  async deleteFile() {}
}

export const fi = new FileData();
