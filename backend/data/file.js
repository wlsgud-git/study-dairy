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
  async modifyFile(info) {
    try {
      let query =
        "update files set full_name=$1, name=$2 where id = $3 RETURNING *";
      const data = [info["full_name"], info["name"], info["id"]];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async deleteFile(id) {
    try {
      let query = "delete from files where id=$1";
      const data = [id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
}

export const fi = new FileData();
