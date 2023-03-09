/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface ICities {
  id: number;
  name: string;
}

interface TCitiesTotalCount {
  totalCount: number;
  data: ICities[];
}

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCitiesTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LINES_LIMIT}&name_like=${filter}`;

    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || Environment.LINES_LIMIT),
      };
    }

    return new Error("Erro ao listar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros"
    );
  }
};

const getById = async (id: number): Promise<ICities | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar os registros"
    );
  }
};

const create = async (
  information: Omit<ICities, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post("/cities", information);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro"
    );
  }
};

const updateById = async (
  id: number,
  information: ICities
): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, information);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar os registros"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao deletar o registro"
    );
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
