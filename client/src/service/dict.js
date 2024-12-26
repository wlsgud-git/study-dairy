export class DictService {
  constructor(http) {
    this.http = http;
  }

  async getDictDetail(id) {
    return this.http.httpFetch(`/dict?id=${id}`, {
      method: "get",
    });
  }

  async createDict(data) {
    return this.http.httpFetch(`/dict`, {
      method: "post",
      body: data,
    });
  }

  async modifyDict(data) {
    return this.http.httpFetch("/dict", {
      method: "put",
      body: data,
    });
  }

  async deleteDict(data) {
    return this.http.httpFetch(
      `/dict?id=${data.id}&dic_type=${data.dic_type}`,
      {
        method: "delete",
      }
    );
  }

  // file
  async searchDict(text) {
    return this.http.httpFetch(`/dict/search?s=${text}`, {
      method: "get",
    });
  }

  async getFile(id) {
    return this.http.httpFetch(`/file?id=${id}`, { method: "get" });
  }

  // fileList
  async getFileList() {
    return this.http.httpFetch(`/fileList`, { method: "get" });
  }

  async insertFileList(data) {
    return this.http.httpFetch(`/fileList`, {
      method: "post",
      body: data,
    });
  }

  async deleteFileList(name, nidx) {
    return this.http.httpFetch(`/fileList?name=${name}&nidx=${nidx}`, {
      method: "delete",
    });
  }
}
