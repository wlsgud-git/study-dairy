export class FileService {
  constructor(http) {
    this.http = http;
  }

  async getFileDetail(fid) {
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
  async modifyFile(data) {
    return this.http.httpFetch("/file", {
      method: "put",
      body: data,
    });
  }
  async deleteFile(id) {
    return this.http.httpFetch(`/file/${id}`, {
      method: "delete",
    });
  }
}
