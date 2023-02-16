/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";

interface IPeopleListing {
  id: number;
  email: string;
  wholeName: string;
  idCity: number;
}

interface IPeopleDetail {
  id: number;
  email: string;
  wholeName: string;
  idCity: number;
}

interface TPeopleTotalCount {
  data: IPeopleListing[];
  totalCount: number;
}

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPeopleTotalCount | Error> => {
  try {
    const urlRelativa = `/people?_page=${page}&_limit=${Enviroment.LINES_LIMIT}&nomeCompleto_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: +headers["x-total-count"] || Enviroment.LINES_LIMIT,
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

const getById = async (id: number): Promise<IPeopleDetail | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao listar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros"
    );
  }
};

const create = async (
  information: Omit<IPeopleDetail, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post("/people", information);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar os registros"
    );
  }
};

const updateById = async (
  id: number,
  information: IPeopleDetail
): Promise<void | Error> => {
  try {
    await Api.put(`/people/${id}`, information);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar os registros"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/people/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao deletar os registros"
    );
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
