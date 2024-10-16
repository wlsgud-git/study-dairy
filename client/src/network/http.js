import axios from "axios";

export class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async httpFetch(url, options) {
    let { body, method, headers } = options;
    let req = {
      url,
      method,
      data: body,
      headers: {
        ...headers,
      },
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return;
    }
  }
}
