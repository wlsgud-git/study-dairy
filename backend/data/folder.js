import { dbPlay } from "../db/db.js";

export class FolderData {
  constructor() {}

  async getFolders() {
    try {
      let query = "select * from folder";
    } catch (err) {}
  }

  async createFolder(title) {
    try {
      let query = "insert into folder values($1)";
      const data = [title];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyFolder() {}
  async deleteFolder() {}
}
