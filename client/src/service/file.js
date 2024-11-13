export class FileService {
  constructor(http) {
    this.http = http;
  }

  async getFiles() {
    return this.http.httpFetch("/files", {
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
