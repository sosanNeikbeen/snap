import axios from "axios";

class Xhr {
  constructor() {
    this.http = axios.create({ withCredentials: true });
    this.http.interceptors.request.use(function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  get(path, config) {
    return this.http.get(path, config);
  }
  put(path, params, config) {
    return this.http.put(path, params, config);
  }
  post(path, params, config) {
    return this.http.post(path, params, config);
  }
  delete(path, params, config) {
    return this.http.delete(path, params, config);
  }
}

export default new Xhr();
