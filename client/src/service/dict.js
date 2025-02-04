export class DictService {
  constructor(http) {
    this.http = http;
  }

  async getLists(id) {
    return this.http.httpFetch(`/dict?id=${id}`, {
      method: "get",
    });
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

  async search(text) {
    return this.http.httpFetch(`/search?q=${text}`, { method: "get" });
  }
}
