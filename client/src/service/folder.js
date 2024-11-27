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

  async modifyFolder(data) {
    return this.http.httpFetch("/folder", {
      method: "put",
      body: data,
    });
  }

  async deleteFolder(id) {
    return this.http.httpFetch(`/folder/${id}`, {
      method: "delete",
    });
  }
}
