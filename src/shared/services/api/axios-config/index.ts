import axios from "axios";
import { Environment } from "../../../environment";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Environment.BASE_URL,
});

Api.interceptors.response.use(
  response => responseInterceptor(response),
  async error => await errorInterceptor(error)
);

export { Api };
