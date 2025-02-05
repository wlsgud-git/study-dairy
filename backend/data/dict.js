import { dbPlay } from "../db/db.js";

class DictData {
  constructor() {}

  async getDicts(id) {
    try {
      let query = `
        select 
        id, fullname, name, dic_type, null as title, null as content
        from folder
        where id>= 1 and folder_id = $1
        union 
        select 
        id, fullname, name, dic_type, title, content 
        from file
        where id>= 1 and folder_id = $2
        `;
      const data = [id, id];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  // id, fullname , name, dic_type, parent_fullname, folder_id
  async createDict(info) {
    try {
      let type = info["dic_type"];
      let query = `insert into ${type} values(default, $1, $2, ${
        info["dic_type"] == "file" ? "default, default," : ""
      } $3, $4, $5) RETURNING *`;
      const data = [
        info["fullname"],
        info["name"],
        info["dic_type"],
        !info["parent_fullname"].length ? [] : info["parent_fullname"],
        info["folder_id"],
      ];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async updateDict(info) {
    try {
      let id = 1;
      let data = [];
      let apText = "";
      for (var key in info) {
        let ch = key.slice(0, 3);
        let val = info[key];
        if (ch == "old") continue;
        apText += `${key} = $${id},`;
        id += 1;
        data.push(val);
      }
      let query = `update ${info["dic_type"]} set ${apText.slice(
        0,
        -1
      )} where id = $${id} returning *`;
      data.push(info["id"]);
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

  async searchFile(text) {
    try {
      let query = `
      select fullname, name from file where name like $1`;
      let data = [`%${text}%`];
      return await dbPlay(query, data);
    } catch (err) {
      throw err;
    }
  }
}

export const dic = new DictData();
