import axios from "axios";
import { Enviroment } from "../../../environment";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Enviroment.BASE_URL,
});

Api.interceptors.response.use(
  response => responseInterceptor(response),
  async error => await errorInterceptor(error)
);

export { Api };
