export class FolderService {
  constructor(http) {
    this.http = http;
  }

  getFolders() {
    return this.http.httpFetch("/folders", {
      method: "get",
    });
  }

  async makeFolder(data) {
    return this.http.httpFetch("/folder", {
      method: "post",
      body: data,
    });
  }

  updateFolder() {}

  deleteFolder() {}
}
