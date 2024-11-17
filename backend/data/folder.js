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
      let query = "insert into folders values()";
      const data = [];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyFolder() {}
  async deleteFolder() {}
}

export const fol = new FolderData();
