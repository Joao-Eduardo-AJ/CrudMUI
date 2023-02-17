import { AxiosError } from "axios";

export const errorInterceptor = async (error: AxiosError) => {
  if (error.message === "Network Error") {
    return await Promise.reject(new Error("Erro de conexão"));
  }

  if (error.response?.status === 401) {
    // Do something
  }

  return await Promise.reject(error);
};
