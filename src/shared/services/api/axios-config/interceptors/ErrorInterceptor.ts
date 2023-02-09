import { AxiosError } from "axios";

export async function errorInterceptor(error: AxiosError) {
  if (error.message === "Network Error") {
    return await Promise.reject(new Error("Erro de conexão"));
  }

  if (error.response?.status === 401) {
    // Do something
  }

  return await Promise.reject(error);
}
