import { dbPlay } from "../db/db.js";

class DictData {
  constructor() {}

  // insturucture = [id, full_name, name, folder_id]
  // get data = [full_name, name, folder_id]

  async searchDict(text) {
    try {
      let query = `
      select full_name, name 
      from file
      where name like $1`;
      let data = [`%${text}%`];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async getDict(id) {
    try {
      let query = `
      select 
      id, nidx, full_name, name, dic_type,
      null as title, null as content, folder_id 
      from folder
      where id>= 1 and folder_id = $1
      union 
      select id, nidx, full_name, name, dic_type, title,
      content , folder_id 
      from file
      where id>= 1 and folder_id = $2
      `;
      const data = [id, id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async createDict(info) {
    try {
      let type = info["dic_type"];
      let query = `insert into ${type} values(default,$1, $2, $3${
        type == "folder" ? "" : ",default, default"
      }, default, $4) RETURNING *`;
      const data = [
        info["nidx"],
        info["full_name"],
        info["name"],
        info["folder_id"],
      ];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyDict(info) {
    // id, dic_type 필수
    try {
      if ("modify_data" in info) {
        delete info["modify_data"];
        delete info["idx"];
        delete info["pidx"];
      }

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
      let query = `delete from ${dic_type} where id= $1 RETURNING *`;
      const data = [id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
}

export const dic = new DictData();
