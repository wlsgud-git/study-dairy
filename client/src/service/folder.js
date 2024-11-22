export class FolderService {
  constructor(http) {
    this.http = http;
  }

  async getFolderDetail(fid) {
    return this.http.httpFetch(`/folders?fid=${fid}`, {
      method: "get",
    });
  }

  async createFolder(data) {
    return this.http.httpFetch("/folder", {
      method: "post",
      body: data,
    });
  }

  async updateFolder() {}

  async deleteFolder() {}
}
