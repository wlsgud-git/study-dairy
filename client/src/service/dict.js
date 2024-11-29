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
}
