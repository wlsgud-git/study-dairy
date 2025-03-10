export class DictService {
  constructor(http) {
    this.http = http;
  }

  // 사전
  async getLists(id) {
    return this.http.httpFetch(`/dict?id=${id}`, { method: "get" });
  }
  async getFile(id) {
    return this.http.httpFetch(`/file?id=${id}`, { method: "get" });
  }

  async insertDict(data) {
    return this.http.httpFetch(`/dict`, {
      method: "post",
      body: data,
    });
  }
  async updateDict(data) {
    return this.http.httpFetch(`/dict`, {
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
  // 검색
  async search(text) {
    return this.http.httpFetch(`/search?q=${text}`, { method: "get" });
  }

  // 이미지
  async ImgUpload(file) {
    return this.http.httpFetch("/img", {
      method: "post",
      body: file,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  // 파일 리스트
  async getFileList() {
    return this.http.httpFetch(`/fileList`, { method: "get" });
  }

  async addFileList(data) {
    return this.http.httpFetch(`/fileList`, {
      method: "post",
      body: data,
    });
  }

  async deleteFileList(id) {
    return this.http.httpFetch(`/fileList?id=${id}`, { method: "delete" });
  }
}
