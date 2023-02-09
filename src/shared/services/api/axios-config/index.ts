import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: "http://locahost:3333",
});

Api.interceptors.response.use(
  response => responseInterceptor(response),
  async error => await errorInterceptor(error)
);

export { Api };
