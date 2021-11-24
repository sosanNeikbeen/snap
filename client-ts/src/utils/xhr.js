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

  get(path) {
    return this.http.get(path);
  }
  put(path, config) {
    return this.http.put(path, config);
  }
  post(path, config) {
    return this.http.post(path, config);
  }
  delete(path) {
    return this.http.delete(path);
  }
}

export default new Xhr();
