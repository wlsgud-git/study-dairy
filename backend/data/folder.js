import { dbPlay } from "../db/db.js";

class FolderData {
  constructor() {}

  // insturucture = [id, full_name, name, folder_id]
  // get data = [full_name, name, folder_id]

  async getFolders(fid) {
    try {
      let query =
        "select * from folders where id >= 1 and folder_id=$1 order by name asc";
      const data = [fid];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async createFolder(info) {
    try {
      let query =
        "insert into folders values(default, $1, $2,default, $3) RETURNING *";
      const data = [info["full_name"], info["name"], info["folder_id"]];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyFolder(info) {
    try {
      let query =
        "update folders set full_name=$1, name=$2 where id = $3 RETURNING *";
      const data = [info["full_name"], info["name"], info["id"]];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async deleteFolder(id) {
    try {
      let query = "delete from folders where id=$1";
      const data = [id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
}

export const fol = new FolderData();
