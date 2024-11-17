export class FileService {
  constructor(http) {
    this.http = http;
  }

  async getFiles(fid) {
    return this.http.httpFetch(`/files?fid=${fid}`, {
      method: "get",
    });
  }
  async createFile(data) {
    return this.http.httpFetch("/file", {
      method: "post",
      body: data,
    });
  }
  async modifyFile() {}
  async deleteFile(data) {
    return this.http.httpFetch("/file", {
      method: "delete",
      body: data,
    });
  }
}
