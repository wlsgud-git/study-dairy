import { dbPlay } from "../db/db.js";

class DictData {
  constructor() {}

  // insturucture = [id, full_name, name, folder_id]
  // get data = [full_name, name, folder_id]

  async getDict(id, dic) {
    try {
      let query = `select * from ${dic} where id >= 1 and folder_id=$1`;
      const data = [id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async createDict(info) {
    try {
      let type = info["dic_type"];
      let query = `insert into ${type} values(default, $1, $2${
        type == "folder" ? "" : ",default, default"
      }, default, $3) RETURNING *`;
      const data = [info["full_name"], info["name"], info["folder_id"]];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyDict(info) {
    // id, dic_type 필수
    try {
      if ("modify_data" in info) delete info["modify_data"];

      let type = info["dic_type"];
      const data = [];
      let setText = "";
      let idx = 1;

      for (var i in info) {
        setText += `${i} = $${idx.toString()},`;
        idx += 1;
        data.push(info[i]);
      }
      setText = setText.slice(0, -1);
      data.push(info["id"]);

      let query = `update ${type} set ${setText} where id=$${idx} RETURNING *`;
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async deleteDict(id, dic_type) {
    try {
      let query = `delete from ${dic_type} where id=$1`;
      const data = [id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
}

export const dic = new DictData();
