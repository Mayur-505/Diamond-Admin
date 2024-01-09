import { Clarity } from "@/lib/types";
import api from "./api";

export const getClarity = async ({
  params,
}: {
  params: { page: number; pageSize: number };
}): Promise<Clarity[]> => {
  const url = "/clarity/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const createClarity = async (name: string) => {
  const url = "/clarity/create";
  const method = "post";
  const data = { name };
  const res = await api({ url, method, data });
  return res.data;
};

export const updateClarity = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<string> => {
  const url = "/clarity/update";
  const method = "patch";
  const data = { clarityid: id, name };
  const res = await api({ url, method, data });
  return res.data;
};

export const deleteClarity = async (id: string) => {
  const url = `/clarity/delete/${id}`;
  const method = "delete";
  const res = await api({ url, method, data: {} });
  return res.data;
};
